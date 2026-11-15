// Re-mounts on navigation, so each page fades in (CSS-only; see .anim-page).
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="anim-page">{children}</div>;
}
