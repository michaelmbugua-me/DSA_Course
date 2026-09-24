#!/usr/bin/env python3
"""Local server for browsing the 500+ DSA question bank offline.

Usage:
    python3 serve.py [port]      (default port: 8000)

Then open http://localhost:8000
"""
import html
import json
import os
import re
import sys
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import unquote, urlparse

ROOT = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_PATH = os.path.join(ROOT, 'assets', 'page.html')

CATEGORIES = ['Array', 'Backtracking', 'Binary', 'Binary Tree', 'BST',
              'Divide & Conquer', 'Dynamic Programming', 'Graph', 'Greedy',
              'Heap', 'Linked List', 'Matrix', 'Puzzles', 'Queue', 'Sorting',
              'Stack', 'String', 'Trie']


def slugify(name):
    return name.lower().replace(' & ', '-').replace(' ', '-')


def count_problems(path):
    with open(path, encoding='utf-8') as f:
        return len(re.findall(r'^\d+\.\s', f.read(), re.M))


def build_index():
    rows = []
    total = 0
    for cat in CATEGORIES:
        p = os.path.join(ROOT, 'problems', f'{slugify(cat)}.md')
        if os.path.exists(p):
            n = count_problems(p)
            total += n
            rows.append(f'<a class="card" href="/problems/{slugify(cat)}.md">'
                        f'<span class="cat">{html.escape(cat)}</span>'
                        f'<span class="count">{n}</span></a>')
    extra = ''.join(
        f'<a class="card" href="/{html.escape(f)}"><span class="cat">misc</span>'
        f'<span class="count">file</span></a>'
        for f in ('full-article.md', 'urls.txt'))
    return f'<div class="grid">{"".join(rows)}{extra}</div>' \
           f'<p class="total">{total} entries &middot; ~630 unique questions &middot; all offline</p>'


def render_page(md_path, rel_path):
    title = os.path.basename(md_path).rsplit('.', 1)[0].replace('-', ' ').title()
    with open(md_path, encoding='utf-8') as f:
        md = f.read()
    template = '''<!doctype html>
<html><head><meta charset="utf-8">
<title>{title}</title>
<link rel="stylesheet" href="/assets/style.css">
<script src="/assets/marked.min.js"></script>
<script src="/assets/app.js"></script>
</head><body>
<header><a href="/">home</a><span class="crumb">{crumb}</span></header>
<main id="content"></main>
<script>document.addEventListener('DOMContentLoaded', () => render({md}, {crumb_js}));</script>
</body></html>'''
    return template.format(
        title=html.escape(title),
        crumb=html.escape(rel_path),
        md=json.dumps(md),
        crumb_js=json.dumps('/' + rel_path),
    )


class Handler(BaseHTTPRequestHandler):
    def log_message(self, *args):
        pass

    def do_GET(self):
        path = unquote(urlparse(self.path).path)
        if path in ('/', '/index.html'):
            body = self.index_page()
            ctype = 'text/html; charset=utf-8'
        elif path == '/search':
            return self.search()
        elif path == '/q':
            return self.query_page()
        else:
            rel = path.lstrip('/')
            full = os.path.normpath(os.path.join(ROOT, rel))
            if not full.startswith(ROOT):
                return self.send(403, 'forbidden')
            if not os.path.isfile(full):
                return self.send(404, f'not found: {rel}')
            if full.endswith(('.md',)):
                body = render_page(full, rel)
                ctype = 'text/html; charset=utf-8'
            else:
                with open(full, 'rb') as f:
                    body = f.read()
                ctype = ('text/css; charset=utf-8' if full.endswith('.css')
                         else 'application/javascript' if full.endswith('.js')
                         else 'text/plain; charset=utf-8' if full.endswith('.txt')
                         else 'application/octet-stream')
        if isinstance(body, str):
            body = body.encode('utf-8')
        self.send_response(200)
        self.send_header('Content-Type', ctype)
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def index_page(self):
        return f'''<!doctype html>
<html><head><meta charset="utf-8"><title>500+ DSA Questions</title>
<link rel="stylesheet" href="/assets/style.css">
<script src="/assets/marked.min.js"></script>
<script src="/assets/app.js"></script>
</head>
<body><header><a href="/">home</a></header>
<h1>500+ Data Structures &amp; Algorithms Questions</h1>
<p>Picked from <a href="https://medium.com/techie-delight/500-data-structures-and-algorithms-practice-problems-35afe8a1e222">Techie Delight on Medium</a> &middot; solutions included &middot; works offline</p>
<p><a class="search-link" href="/q">search questions</a></p>
{build_index()}
</body></html>'''

    def query_page(self):
        return '''<!doctype html><html><head><meta charset="utf-8">
<title>Search</title><link rel="stylesheet" href="/assets/style.css">
</head><body>
<header><a href="/">home</a><span class="crumb">search</span></header>
<main>
<input id="q" placeholder="type to search all 812 questions..." autofocus>
<div id="out"></div>
</main>
<script>
const inp = document.getElementById('q');
const out = document.getElementById('out');
let t;
inp.addEventListener('input', () => {
  clearTimeout(t);
  t = setTimeout(async () => {
    const term = inp.value.trim();
    if (term.length < 2) { out.innerHTML = ''; return; }
    const r = await fetch('/search?q=' + encodeURIComponent(term));
    const results = await r.json();
    out.innerHTML = results.map(x =>
      `<a href="/${x.href}">${x.title}<small>${x.cat}</small></a>`).join('')
      || '<p style="color:#8b90a0">no matches</p>';
  }, 150);
});
</script>
</body></html>'''

    def search(self):
        # simple JSON search over problems/*.md
        from urllib.parse import parse_qs
        qs = parse_qs(urlparse(self.path).query)
        term = (qs.get('q') or [''])[0].lower()
        results = []
        if len(term) >= 2:
            for cat in CATEGORIES:
                p = os.path.join(ROOT, 'problems', f'{slugify(cat)}.md')
                if not os.path.exists(p):
                    continue
                with open(p, encoding='utf-8') as f:
                    for line in f:
                        m = re.match(r'^\d+\.\s+\[([^\]]+)\]\(([^)]+)\)', line.strip())
                        if m and term in m.group(1).lower():
                            results.append({'title': m.group(1), 'href': m.group(2), 'cat': cat})
        body = json.dumps(results[:50]).encode()
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    print(f'Serving DSA question bank at http://localhost:{port}')
    ThreadingHTTPServer(('127.0.0.1', port), Handler).serve_forever()
