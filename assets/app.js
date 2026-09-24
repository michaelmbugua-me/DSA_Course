// shared renderer + search logic (served inline or as file)
function render(md, crumb) {
  const html = marked.parse(md);
  const el = document.getElementById('content');
  el.innerHTML = html;
  // rewrite relative .md links so they resolve from any path
  el.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (href && href.endsWith('.md') && !href.startsWith('/')) {
      const clean = href.replace(/^(\.\.\/)+/, '');
      a.setAttribute('href', '/' + clean);
    }
  });
  // tag external links
  el.querySelectorAll('a[href^="http"]').forEach(a => a.target = '_blank');
  document.title = (el.querySelector('h1')?.textContent || crumb);
}
