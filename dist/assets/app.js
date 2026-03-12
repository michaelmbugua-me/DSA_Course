// shared renderer + search logic (served inline or as file)

function syncThemeButton() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.textContent = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    syncThemeButton();
    btn.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      localStorage.setItem('theme', next);
      syncThemeButton();
    });
  }
  updatePatternDashboard();
});

const PATTERN_PROGRESS_KEY = 'medium-dsas-pattern-progress-v1';
const PATTERN_QUESTION_GOAL = 5;

function getPatternProgress() {
  try {
    return JSON.parse(localStorage.getItem(PATTERN_PROGRESS_KEY) || '{}');
  } catch {
    return {};
  }
}

function savePatternProgress(progress) {
  localStorage.setItem(PATTERN_PROGRESS_KEY, JSON.stringify(progress));
}

function updatePatternDashboard() {
  const progress = getPatternProgress();
  document.querySelectorAll('.grid a.card[href*="/patterns/"]').forEach(card => {
    const slug = new URL(card.href, location.href).pathname.split('/').filter(Boolean).pop()
      ?.replace(/\.md$/, '');
    if (!slug || slug === 'README' || slug === 'raw-article') return;
    let status = card.querySelector('.pattern-progress');
    if (!status) {
      status = document.createElement('span');
      status.className = 'pattern-progress mono';
      card.append(status);
    }
    const state = progress[slug] || {};
    const done = Object.values(state.questions || {}).filter(Boolean).length;
    status.textContent = state.complete ? 'complete' : `${done}/${PATTERN_QUESTION_GOAL}`;
    status.classList.toggle('is-complete', Boolean(state.complete));
    card.classList.toggle('is-pattern-complete', Boolean(state.complete));
  });
}

function setupPatternChecklist(content) {
  const practiceHeading = [...content.querySelectorAll('h2')].find(h =>
    h.textContent.trim().toLowerCase() === 'practice problems in this repo');
  if (!practiceHeading) return;

  const slug = location.pathname.split('/').filter(Boolean).pop()?.replace(/\.md$/, '');
  if (!slug) return;
  const list = practiceHeading.nextElementSibling;
  if (!list || !['UL', 'OL'].includes(list.tagName)) return;

  const practiceItems = [...list.querySelectorAll(':scope > li')].filter(item => item.querySelector('a[href]'));
  const trackedItems = practiceItems.slice(0, PATTERN_QUESTION_GOAL);
  if (!trackedItems.length) return;

  const panel = document.createElement('section');
  panel.className = 'pattern-checklist';
  panel.setAttribute('aria-label', 'Pattern study checklist');

  const heading = document.createElement('h3');
  heading.textContent = 'Study checklist';
  panel.append(heading);

  const summary = document.createElement('p');
  summary.className = 'checklist-summary';
  summary.textContent = `Work through these ${trackedItems.length} practice questions, then mark the pattern complete.`;
  panel.append(summary);

  const completeLabel = document.createElement('label');
  completeLabel.className = 'pattern-complete-control';
  const completeInput = document.createElement('input');
  completeInput.type = 'checkbox';
  completeInput.dataset.patternComplete = 'true';
  completeLabel.append(completeInput, document.createTextNode(' Mark pattern complete'));
  panel.append(completeLabel);

  const progressLabel = document.createElement('span');
  progressLabel.className = 'checklist-count mono';
  progressLabel.setAttribute('aria-live', 'polite');
  panel.append(progressLabel);

  const checklistList = document.createElement('ul');
  checklistList.className = 'pattern-checklist-questions';
  panel.append(checklistList);

  const stored = getPatternProgress();
  const state = stored[slug] || { complete: false, questions: {} };
  completeInput.checked = Boolean(state.complete);

  const questionState = state.questions || {};
  trackedItems.forEach(item => {
    const link = item.querySelector('a[href]');
    const href = new URL(link.href, location.href).pathname;
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.className = 'question-check';
    input.setAttribute('aria-label', `Mark ${link.textContent.trim()} complete`);
    input.checked = Boolean(questionState[href]);
    input.dataset.questionHref = href;
    item.classList.add('checklist-question');
    item.prepend(input);
    item.classList.toggle('is-checked', input.checked);
    checklistList.append(item);
  });
  if (!list.children.length) list.remove();

  function updateChecklist() {
    const checked = trackedItems.filter(item => item.querySelector('.question-check').checked).length;
    progressLabel.textContent = `${checked}/${trackedItems.length} questions done`;
    completeLabel.classList.toggle('is-checked', completeInput.checked);
    trackedItems.forEach(item => item.classList.toggle('is-checked', item.querySelector('.question-check').checked));
    stored[slug] = {
      complete: completeInput.checked,
      questions: Object.fromEntries(trackedItems.map(item => {
        const input = item.querySelector('.question-check');
        return [input.dataset.questionHref, input.checked];
      }))
    };
    savePatternProgress(stored);
    updatePatternDashboard();
  }

  completeInput.addEventListener('change', updateChecklist);
  panel.addEventListener('change', event => {
    if (event.target.matches('.question-check')) updateChecklist();
  });
  updateChecklist();
  practiceHeading.after(panel);
}

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
  setupPatternChecklist(el);
}
