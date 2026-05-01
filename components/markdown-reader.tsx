'use client';

import { useEffect, useRef } from 'react';

const STORAGE_KEY = 'medium-dsas-pattern-progress-v1';
const QUESTION_GOAL = 5;
type Props = { html: string; baseHref: string; patternSlug?: string };

function readProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as Record<string, any>;
  } catch {
    return {};
  }
}

export function MarkdownReader({ html, baseHref, patternSlug }: Props) {
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    content.querySelectorAll<HTMLAnchorElement>('a[href]').forEach(anchor => {
      const href = anchor.getAttribute('href');
      if (href && /^https?:\/\//i.test(href)) {
        anchor.target = '_blank';
        anchor.rel = 'noreferrer';
      }
      if (href?.endsWith('.md') && !href.startsWith('/') && !href.startsWith('http')) {
        anchor.href = new URL(href, `${location.origin}${baseHref}`).pathname.replace(/\.md$/, '');
      }
    });

    const highlight = () => {
      const prism = (window as Window & { Prism?: { highlightAllUnder: (element: HTMLElement) => void } }).Prism;
      prism?.highlightAllUnder(content);
    };
    if ((window as Window & { Prism?: unknown }).Prism) {
      highlight();
    } else if (!document.querySelector('script[data-prism]')) {
      const script = document.createElement('script');
      script.src = '/assets/prism.js';
      script.dataset.prism = 'true';
      script.onload = highlight;
      document.body.append(script);
    } else {
      document.querySelector('script[data-prism]')?.addEventListener('load', highlight, { once: true });
    }

    if (!patternSlug) return;
    const practiceHeading = [...content.querySelectorAll('h2')].find(heading =>
      heading.textContent?.trim().toLowerCase() === 'practice problems in this repo');
    const practiceList = practiceHeading?.nextElementSibling;
    if (!practiceHeading || !practiceList || !['UL', 'OL'].includes(practiceList.tagName)) return;

    const items = [...practiceList.querySelectorAll(':scope > li')]
      .filter(item => item.querySelector('a[href]'))
      .slice(0, QUESTION_GOAL);
    if (!items.length) return;

    const progress = readProgress();
    const state = progress[patternSlug] || { complete: false, questions: {} };
    const panel = document.createElement('section');
    panel.className = 'pattern-checklist';
    panel.setAttribute('aria-label', 'Pattern study checklist');

    const title = document.createElement('h3');
    title.textContent = 'Study checklist';
    panel.append(title);

    const summary = document.createElement('p');
    summary.className = 'checklist-summary';
    summary.textContent = `Work through these ${items.length} practice questions, then mark the pattern complete.`;
    panel.append(summary);

    const completeLabel = document.createElement('label');
    completeLabel.className = 'pattern-complete-control';
    const completeInput = document.createElement('input');
    completeInput.type = 'checkbox';
    completeInput.checked = Boolean(state.complete);
    completeLabel.append(completeInput, document.createTextNode(' Mark pattern complete'));
    panel.append(completeLabel);

    const count = document.createElement('span');
    count.className = 'checklist-count mono';
    count.setAttribute('aria-live', 'polite');
    panel.append(count);

    const checklist = document.createElement('ul');
    checklist.className = 'pattern-checklist-questions';
    panel.append(checklist);

    items.forEach(item => {
      const link = item.querySelector<HTMLAnchorElement>('a[href]')!;
      const href = new URL(link.href, location.href).pathname;
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'question-check';
      checkbox.checked = Boolean(state.questions?.[href]);
      checkbox.dataset.questionHref = href;
      checkbox.setAttribute('aria-label', `Mark ${link.textContent?.trim()} complete`);
      item.classList.add('checklist-question');
      item.prepend(checkbox);
      checklist.append(item);
    });
    if (!practiceList.children.length) practiceList.remove();

    const update = () => {
      const checked = items.filter(item => item.querySelector<HTMLInputElement>('.question-check')?.checked).length;
      count.textContent = `${checked}/${items.length} questions done`;
      completeLabel.classList.toggle('is-checked', completeInput.checked);
      items.forEach(item => item.classList.toggle('is-checked', Boolean(item.querySelector<HTMLInputElement>('.question-check')?.checked)));
      progress[patternSlug] = {
        complete: completeInput.checked,
        questions: Object.fromEntries(items.map(item => {
          const input = item.querySelector<HTMLInputElement>('.question-check')!;
          return [input.dataset.questionHref!, input.checked];
        })),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    };
    const handleChange = (event: Event) => {
      if (event.target === completeInput || (event.target as HTMLElement).matches('.question-check')) update();
    };
    panel.addEventListener('change', handleChange);
    update();
    practiceHeading.after(panel);

    return () => panel.removeEventListener('change', handleChange);
  }, [baseHref, patternSlug]);

  return <main id="content" ref={contentRef} dangerouslySetInnerHTML={{ __html: html }} />;
}
