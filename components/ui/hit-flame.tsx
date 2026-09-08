import { useId } from "react";

export function HitFlame() {
  const id = useId();
  return <svg width="25" height="30" viewBox="0 0 24 30" aria-hidden="true"><defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ed83c5" /><stop offset=".5" stopColor="#bc95eb" /><stop offset="1" stopColor="#86d6fb" /></linearGradient></defs><path fill={`url(#${id})`} d="M13 0c2 8-5 10-5 15-2-1-3-3-3-5C-3 20 2 29 12 30c10-1 15-10 7-20 0 4-2 6-3 6 2-6 2-10-3-16Z" /><path fill="#f5f5f3" d="M12 29c-6-3-4-7 1-13-1 6 6 7-1 13Z" /></svg>;
}
