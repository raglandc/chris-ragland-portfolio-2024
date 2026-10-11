import { flushSync } from "react-dom";

// TypeScript 5.1's DOM types don't include the View Transitions API yet
type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => unknown;
};

// Cross-fades between themes using the View Transitions API.
// Falls back to an instant switch when unsupported or reduced motion is preferred.
export function setThemeSmoothly(setTheme: (theme: string) => void, theme: string) {
  const doc = document as ViewTransitionDocument;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!doc.startViewTransition || prefersReducedMotion) {
    setTheme(theme);
    return;
  }

  // flushSync ensures next-themes updates the <html> class before the new snapshot is taken
  doc.startViewTransition(() => flushSync(() => setTheme(theme)));
}
