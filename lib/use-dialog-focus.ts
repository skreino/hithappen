import { useEffect, useRef } from "react";
export function useDialogFocus(onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  useEffect(() => { closeRef.current = onClose; }, [onClose]);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const root = ref.current;
    const focusable = () => Array.from(root?.querySelectorAll<HTMLElement>('button:not(:disabled), input, a[href], [tabindex="0"]') ?? []);
    (root?.querySelector<HTMLElement>('input[type="search"]') ?? focusable()[0])?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); closeRef.current(); }
      if (event.key !== "Tab") return;
      const items = focusable(), first = items[0], last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    root?.addEventListener("keydown", keydown);
    return () => { root?.removeEventListener("keydown", keydown); previous?.focus(); };
  }, []);
  return ref;
}
