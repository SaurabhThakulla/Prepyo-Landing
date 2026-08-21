export type ExamType = 'PTE' | 'IELTS';

const STORAGE_KEY = 'prepyo-active-exam';
const EVENT = 'prepyo:exam-change';

/**
 * Which exam the visitor is browsing for.
 *
 * In the app this lives on the user's profile, but a marketing page has no
 * signed-in user to save it against — so the choice is kept in localStorage and
 * broadcast as an event, which is all the nav and the exam cards need to stay
 * in sync with each other.
 */
export function getActiveExam(): ExamType {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === 'IELTS' ? 'IELTS' : 'PTE';
}

export function setActiveExam(exam: ExamType): void {
  localStorage.setItem(STORAGE_KEY, exam);
  document.dispatchEvent(new CustomEvent<ExamType>(EVENT, { detail: exam }));
}

export function onExamChange(handler: (exam: ExamType) => void): void {
  document.addEventListener(EVENT, event => handler((event as CustomEvent<ExamType>).detail));
}
