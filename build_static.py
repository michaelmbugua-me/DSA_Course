#!/usr/bin/env python3
"""Pre-render the question bank into a static site (dist/) for Firebase Hosting.

Usage:
    python3 build_static.py
"""
import json
import os
import re
import shutil

import serve

ROOT = os.path.dirname(os.path.abspath(__file__))
DIST = os.path.join(ROOT, 'dist')


def clean(url):
    """Strip .md extension so cleanUrls resolves the pre-rendered .html."""
    return url[:-3] if url.endswith('.md') else url


def pattern_cards():
    rows = []
    for f in sorted(os.listdir(os.path.join(ROOT, 'patterns'))):
        if not f.endswith('.md') or f == 'README.md':
            continue
        num, *rest = f[:-3].split('-')
        name = ' '.join(rest).title()
        rows.append(f'<a class="card" href="/patterns/{f[:-3]}">'
                    f'<span class="cat">{num}. {name.title()}</span>'
                    f'<span class="count">&rarr;</span></a>')
    return ''.join(rows)


def build_index():
    rows = []
    total = 0
    for cat in serve.CATEGORIES:
        p = os.path.join(ROOT, 'problems', f'{serve.slugify(cat)}.md')
        if os.path.exists(p):
            n = serve.count_problems(p)
            total += n
            rows.append(f'<a class="card" href="/problems/{serve.slugify(cat)}">'
                        f'<span class="cat">{cat}</span>'
                        f'<span class="count">{n}</span></a>')
    extra = (f'<a class="card" href="/full-article"><span class="cat">misc</span>'
             f'<span class="count">file</span></a>'
             f'<a class="card" href="/urls.txt"><span class="cat">misc</span>'
             f'<span class="count">file</span></a>')
    return f'<div class="grid">{"".join(rows)}{extra}</div>' \
           f'<p class="total">{total} entries &middot; ~630 unique questions &middot; all offline</p>' \
           f'<h2>19 Interview Patterns</h2>' \
           f'<p>Study cards based on <a href="/patterns/raw-article">14 Patterns to Ace Any Coding Interview Question</a>, extended with templates, pitfalls and linked practice problems. <a href="/patterns/README">Cheat sheet &amp; decision flow</a></p>' \
           f'<div class="grid">{pattern_cards()}</div>'


def index_page():
    return f'''<!doctype html>
<html><head>{serve.head("500+ DSA Questions")}</head>
<body><header><a class="home" href="/">home</a><button id="theme-toggle" type="button" aria-label="toggle dark mode"></button></header>
<main><h1>500+ Data Structures &amp; Algorithms Questions</h1>
<p>Picked from <a href="https://medium.com/techie-delight/500-data-structures-and-algorithms-practice-problems-35afe8a1e222">Techie Delight on Medium</a> &middot; solutions included &middot; works offline</p>
<p><a class="search-link" href="/q">search questions</a></p>
{build_index()}
</main></body></html>'''


def query_page():
    return ('<!doctype html><html><head>' + serve.head("Search") + '</head><body>\n'
            '<header><a class="home" href="/">home</a><span class="crumb">search</span><button id="theme-toggle" type="button" aria-label="toggle dark mode"></button></header>\n'
            '<main>\n'
            '<input id="q" placeholder="type to search all 812 questions..." autofocus>\n'
            '<div id="out"></div>\n'
            '</main>\n'
            '<script>\n'
            "const inp = document.getElementById('q');\n"
            "const out = document.getElementById('out');\n"
            "let index = null;\n"
            "fetch('/search.json').then(r => r.json()).then(d => index = d);\n"
            'let t;\n'
            "inp.addEventListener('input', () => {\n"
            '  clearTimeout(t);\n'
            '  t = setTimeout(() => {\n'
            '    const term = inp.value.trim().toLowerCase();\n'
            "    if (term.length < 2) { out.innerHTML = ''; return; }\n"
            '    const results = (index || []).filter(x => x.title.toLowerCase().includes(term)).slice(0, 50);\n'
            "    out.innerHTML = results.map(x =>\n"
            "      `<a href=\"${x.href}\">${x.title}<small>${x.cat}</small></a>`).join('')\n"
            "      || '<p style=\"color:#8b90a0\">no matches</p>';\n"
            '  }, 150);\n'
            '});\n'
            '</script>\n'
            '</body></html>')


def build_search_index():
    results = []
    for cat in serve.CATEGORIES:
        p = os.path.join(ROOT, 'problems', f'{serve.slugify(cat)}.md')
        if not os.path.exists(p):
            continue
        with open(p, encoding='utf-8') as f:
            for line in f:
                m = re.match(r'^\d+\.\s+\[([^\]]+)\]\(([^)]+)\)', line.strip())
                if m:
                    href = m.group(2)
                    if href.endswith('.md') and not href.startswith('http'):
                        href = '/' + os.path.normpath(
                            os.path.join('problems', href)).replace('\\', '/')[:-3]
                    results.append({'title': m.group(1), 'href': href, 'cat': cat})
    return results


def main():
    if os.path.exists(DIST):
        shutil.rmtree(DIST)
    os.makedirs(DIST)
    shutil.copytree(os.path.join(ROOT, 'assets'), os.path.join(DIST, 'assets'))
    shutil.copy(os.path.join(ROOT, 'urls.txt'), DIST)

    with open(os.path.join(DIST, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(index_page())
    with open(os.path.join(DIST, 'q.html'), 'w', encoding='utf-8') as f:
        f.write(query_page())
    with open(os.path.join(DIST, 'search.json'), 'w', encoding='utf-8') as f:
        json.dump(build_search_index(), f, ensure_ascii=False)

    for sub in ('patterns', 'problems', 'solutions'):
        os.makedirs(os.path.join(DIST, sub))
        for f in sorted(os.listdir(os.path.join(ROOT, sub))):
            if f.endswith('.md'):
                src = os.path.join(ROOT, sub, f)
                out = os.path.join(DIST, sub, f[:-3] + '.html')
                with open(out, 'w', encoding='utf-8') as w:
                    w.write(serve.render_page(src, f'{sub}/{f}'))

    src = os.path.join(ROOT, 'full-article.md')
    with open(os.path.join(DIST, 'full-article.html'), 'w', encoding='utf-8') as f:
        f.write(serve.render_page(src, 'full-article.md'))

    total = sum(len(files) for _, _, files in os.walk(DIST))
    print(f'Built static site into dist/ ({total} files)')


if __name__ == '__main__':
    main()
