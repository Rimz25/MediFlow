import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarPlus,
  LogOut,
  Stethoscope,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Book Appointment",
      path: "/book-appointment",
      icon: <CalendarPlus size={20} />,
    },
    {
      name: "Doctors",
      path: "/doctors",
      icon: <Stethoscope size={20} />,
    },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <aside className="w-64 min-h-screen bg-slate-900 border-r border-slate-800 p-6">
      <h1 className="text-3xl font-bold text-cyan-400 mb-10">MediFlow</h1>

      <nav className="space-y-3">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-3 p-3 rounded-xl transition ${
              location.pathname === link.path
                ? "bg-cyan-500 text-white"
                : "hover:bg-slate-800 text-slate-300"
            }`}
          >
            {link.icon}
            {link.name}
          </Link>
        ))}

        {user.role === "admin" && (
          <Link
            to="/admin"
            className={`flex items-center gap-3 p-3 rounded-xl transition ${
              location.pathname === "/admin"
                ? "bg-cyan-500 text-white"
                : "hover:bg-slate-800 text-slate-300"
            }`}
          >
            <LayoutDashboard size={20} />
            Admin Dashboard
          </Link>
        )}

        <button
          onClick={logout}
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-500 w-full text-left"
        >
          <LogOut size={20} />
          Logout
        </button>
      </nav>
    </aside>
  );
}
