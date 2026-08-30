const colors = ["#D7A189", "#29333B", "#B58A6A"];

export function AvatarStack({ count = 3 }: { count?: number }) {
  return <span className="avatar-stack" aria-hidden="true">{colors.slice(0, count).map((color, index) => <i key={color} style={{ backgroundColor: color }}>{["L","M","A"][index]}</i>)}</span>;
}
