import { Link, Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();

  const linkClass = (path: string) =>
    `px-4 py-2 text-sm ${
      location.pathname === path
        ? "text-accent border-b-2 border-accent"
        : "text-gray-300 hover:text-white"
    }`;

  return (
    <div className="h-screen flex flex-col bg-background text-white">

      {/* Toolbar */}
      <div className="h-14 bg-panel flex items-center px-6 border-b border-gray-700">

        {/* LOGO (Clickable) */}
        <Link to="/" className="mr-8 flex items-center">
          <img
            src="/logo.jpeg"
            alt="Product Logo"
            className="h-9 object-contain"
          />
        </Link>

        {/* Navigation */}
        <nav className="flex space-x-4">
          <Link to="/" className={linkClass("/")}>
            Dashboard
          </Link>
          <Link to="/mission" className={linkClass("/mission")}>
            Mission
          </Link>
          <Link to="/ai" className={linkClass("/ai")}>
            Autonomy Settings
          </Link>
          <Link to="/health" className={linkClass("/health")}>
            System Health
          </Link>
          <Link to="/settings" className={linkClass("/settings")}>
            Settings
          </Link>
        </nav>
      </div>

      {/* Page Content */}
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}