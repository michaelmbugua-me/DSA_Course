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


def pattern_cards():
    rows = []
    for f in sorted(os.listdir(os.path.join(ROOT, 'patterns'))):
        if not f.endswith('.md') or f == 'README.md':
            continue
        num, *rest = f[:-3].split('-')
        name = ' '.join(rest).title()
        rows.append(f'<a class="card" href="/patterns/{f}">'
                    f'<span class="cat">{num}. {html.escape(name.title())}</span>'
                    f'<span class="count">&rarr;</span></a>')
    return ''.join(rows)


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
           f'<p class="total">{total} entries &middot; ~630 unique questions &middot; all offline</p>' \
           f'<h2>19 Interview Patterns</h2>' \
           f'<p>Study cards based on <a href="/patterns/raw-article.md">14 Patterns to Ace Any Coding Interview Question</a>, extended with templates, pitfalls and linked practice problems. <a href="/patterns/README.md">Cheat sheet &amp; decision flow</a></p>' \
           f'<div class="grid">{pattern_cards()}</div>'


FAVICON = ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' "
           "viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' "
           "fill='%230c0d10'/%3E%3Cpath d='M10 10v12l12-6z' "
           "fill='%23d9a253'/%3E%3C/svg%3E")


def head(title):
    return (f'<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">'
            f'<title>{html.escape(title)}</title>'
            f'<link rel="icon" href="{FAVICON}">'
            f'<script>document.documentElement.dataset.theme=localStorage.getItem("theme")||"light";</script>'
            f'<link rel="stylesheet" href="/assets/style.css">'
            f'<script src="/assets/marked.min.js"></script>'
            f'<script src="/assets/prism.js"></script>'
            f'<script src="/assets/app.js"></script>')


def render_page(md_path, rel_path):
    title = os.path.basename(md_path).rsplit('.', 1)[0].replace('-', ' ').title()
    with open(md_path, encoding='utf-8') as f:
        md = f.read()
    template = f'''<!doctype html>
<html><head>{head(title)}</head><body>
<header><a class="home" href="/">home</a><span class="crumb">{{crumb}}</span><button id="theme-toggle" type="button" aria-label="toggle dark mode"></button></header>
<main id="content"></main>
<script>document.addEventListener('DOMContentLoaded', () => render({{md}}, {{crumb_js}}));</script>
</body></html>'''
    return template.format(
        md=json.dumps(md),
        crumb=html.escape(rel_path),
        crumb_js=json.dumps('/' + rel_path),
    )


class Handler(BaseHTTPRequestHandler):
    def log_message(self, *args):
        pass

    def send(self, code, text):
        body = text.encode('utf-8')
        self.send_response(code)
        self.send_header('Content-Type', 'text/plain; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        path = unquote(urlparse(self.path).path)
        if path in ('/', '/index.html'):
            body = self.index_page()
            ctype = 'text/html; charset=utf-8'
        elif path == '/search':
            return self.search()
        elif path == '/q':
            body = self.query_page()
            ctype = 'text/html; charset=utf-8'
        else:
            rel = path.lstrip('/')
            full = os.path.normpath(os.path.join(ROOT, rel))
            if not full.startswith(ROOT):
                return self.send(403, 'forbidden')
            if not os.path.isfile(full):
                if os.path.isfile(full + '.md'):
                    full += '.md'
                else:
                    return self.send(404, f'not found: {rel}')
            if full.endswith(('.md',)):
                body = render_page(full, rel)
                ctype = 'text/html; charset=utf-8'
            else:
                with open(full, 'rb') as f:
                    body = f.read()
                ctype = ('text/css; charset=utf-8' if full.endswith('.css')
                         else 'application/javascript' if full.endswith('.js')
                         else 'font/woff2' if full.endswith('.woff2')
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
<html><head>{head("500+ DSA Questions")}</head>
<body><header><a class="home" href="/">home</a><button id="theme-toggle" type="button" aria-label="toggle dark mode"></button></header>
<main><h1>500+ Data Structures &amp; Algorithms Questions</h1>
<p>Picked from <a href="https://medium.com/techie-delight/500-data-structures-and-algorithms-practice-problems-35afe8a1e222">Techie Delight on Medium</a> &middot; solutions included &middot; works offline</p>
<p><a class="search-link" href="/q">search questions</a></p>
{build_index()}
</main></body></html>'''

    def query_page(self):
        return ('<!doctype html><html><head>' + head("Search") + '</head><body>\n'
                '<header><a class="home" href="/">home</a><span class="crumb">search</span><button id="theme-toggle" type="button" aria-label="toggle dark mode"></button></header>\n'
                '<main>\n'
                '<input id="q" placeholder="type to search all 812 questions..." autofocus>\n'
                '<div id="out"></div>\n'
                '</main>\n'
                '<script>\n'
                "const inp = document.getElementById('q');\n"
                "const out = document.getElementById('out');\n"
                'let t;\n'
                "inp.addEventListener('input', () => {\n"
                '  clearTimeout(t);\n'
                '  t = setTimeout(async () => {\n'
                '    const term = inp.value.trim();\n'
                "    if (term.length < 2) { out.innerHTML = ''; return; }\n"
                "    const r = await fetch('/search?q=' + encodeURIComponent(term));\n"
                '    const results = await r.json();\n'
                '    out.innerHTML = results.map(x =>\n'
                '      `<a href="/${x.href}">${x.title}<small>${x.cat}</small></a>`).join(\'\')\n'
                '      || \'<p style="color:#8b90a0">no matches</p>\';\n'
                '  }, 150);\n'
                '});\n'
                '</script>\n'
                '</body></html>')

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
    # find a free port: if the requested one is busy, walk upwards
    import socket
    for candidate in range(port, port + 50):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind(('localhost', candidate))
            except OSError:
                print(f'Port {candidate} is busy, trying next...')
                continue
            port = candidate
            break
    else:
        sys.exit('No free port found in range')
    print(f'Serving DSA question bank at http://localhost:{port}')
    ThreadingHTTPServer(('localhost', port), Handler).serve_forever()
