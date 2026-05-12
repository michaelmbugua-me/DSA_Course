export type PatternProgressState = {
  complete?: boolean;
  questions?: Record<string, boolean>;
};

export type PatternProgress = Record<string, PatternProgressState>;

const STORAGE_KEY = 'medium-dsas-pattern-progress-v1';

export function readPatternProgress(): PatternProgress {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return {};
    return stored as PatternProgress;
  } catch {
    return {};
  }
}

export function savePatternProgress(progress: PatternProgress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Storage can be unavailable or over quota; checklist interaction still works.
  }
}
