// shared renderer + search logic (served inline or as file)

function syncThemeButton() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.textContent = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  syncThemeButton();
  btn.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
    syncThemeButton();
  });
});
function render(md, crumb) {
  const html = marked.parse(md);
  const el = document.getElementById('content');
  el.innerHTML = html;
  // normalize fence languages Prism doesn't define (python3 -> python)
  el.querySelectorAll('code[class*="language-python3"]').forEach(c => {
    c.classList.replace('language-python3', 'language-python');
  });
  if (window.Prism) Prism.highlightAllUnder(el);
  // rewrite relative .md links so they resolve from any path
  el.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (href && href.endsWith('.md') && !href.startsWith('/') && !href.startsWith('http')) {
      a.setAttribute('href', new URL(href, crumb).pathname.replace(/\.md$/, ''));
    }
  });
  // tag external links
  el.querySelectorAll('a[href^="http"]').forEach(a => a.target = '_blank');
  document.title = (el.querySelector('h1')?.textContent || crumb);
}
