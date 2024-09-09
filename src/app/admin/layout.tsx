export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <a href="/admin">Login</a>
          </li>
          <li>
            <a href="/admin/event">Post</a>
          </li>
          <li>
            <a href="/admin/event/[event]">Event</a>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  );
}