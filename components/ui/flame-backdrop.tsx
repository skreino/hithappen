// Flame path adapted from AnimateIcons / Lucide, Avijit Dey (MIT).
// Attribution and license: /THIRD_PARTY_NOTICES.md.
const flamePath = "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4";

/** Decorative, non-interactive and SSR-safe. Motion is bounded and handled by CSS. */
export function FlameBackdrop() {
  return (
    <div className="flame-backdrop" aria-hidden="true">
      <div className="flame-backdrop__shape flame-backdrop__shape--upper">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false"><path d={flamePath} /></svg>
      </div>
      <div className="flame-backdrop__shape flame-backdrop__shape--lower">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false"><path d={flamePath} /></svg>
      </div>
    </div>
  );
}
