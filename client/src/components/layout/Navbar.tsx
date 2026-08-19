import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Stethoscope,
  CalendarDays,
  Users,
  LayoutDashboard,
  LogIn,
  UserPlus,
  LogOut,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isLoggedIn = !!user;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setMobileOpen(false);
    navigate("/login");
  };

  const closeMobile = () => {
    setMobileOpen(false);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative flex items-center gap-2 text-sm font-semibold transition-all duration-200 ${
      isActive ? "text-cyan-400" : "text-slate-300 hover:text-cyan-400"
    }`;

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition ${
      isActive
        ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/10"
        : "text-slate-300 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="bg-slate-950/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between">
            {/* =====================================================
                LOGO
            ===================================================== */}
            <Link
              to="/"
              onClick={closeMobile}
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:border-cyan-400/40 transition-all duration-300">
                  <Stethoscope
                    size={24}
                    className="text-cyan-400 group-hover:scale-110 transition-transform"
                  />
                </div>

                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-slate-950" />
              </div>

              <div className="hidden sm:block">
                <h1 className="text-xl font-black tracking-tight text-white">
                  Medi<span className="text-cyan-400">Flow</span>
                </h1>

                <p className="text-[9px] uppercase tracking-[0.22em] text-slate-500">
                  Healthcare Platform
                </p>
              </div>
            </Link>

            {/* =====================================================
                DESKTOP NAVIGATION
            ===================================================== */}

            <div className="hidden md:flex items-center gap-8">
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>

              {/* Always visible */}
              <NavLink to="/doctors" className={navLinkClass}>
                <Users size={16} />
                Doctors
              </NavLink>

              {/* Always visible */}
              <NavLink to="/book-appointment" className={navLinkClass}>
                <CalendarDays size={16} />
                Book Appointment
              </NavLink>

              {/* Only logged-in users */}
              {isLoggedIn && (
                <>
                  <NavLink to="/dashboard" className={navLinkClass}>
                    <LayoutDashboard size={16} />
                    Dashboard
                  </NavLink>

                  {user?.role === "admin" && (
                    <NavLink to="/admin" className={navLinkClass}>
                      Admin
                    </NavLink>
                  )}
                </>
              )}
            </div>

            {/* =====================================================
                DESKTOP AUTH
            ===================================================== */}
            <div className="hidden md:flex items-center gap-3">
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition"
                  >
                    <LogIn size={17} />
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30"
                  >
                    <UserPlus size={17} />
                    Get Started
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  {/* User */}
                  <div className="hidden xl:flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <Users size={16} className="text-cyan-400" />
                    </div>

                    <div className="max-w-[120px]">
                      <p className="text-xs font-semibold text-white truncate">
                        {user?.fullName || "User"}
                      </p>

                      <p className="text-[10px] text-slate-500 capitalize">
                        {user?.role || "patient"}
                      </p>
                    </div>

                    <ChevronDown size={14} className="text-slate-500" />
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:border-red-400/50 hover:text-red-400 hover:bg-red-500/5 transition text-sm font-semibold"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* =====================================================
                MOBILE MENU BUTTON
            ===================================================== */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition"
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={25} /> : <Menu size={25} />}
            </button>
          </div>
        </div>

        {/* =====================================================
            MOBILE MENU
        ===================================================== */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 bg-slate-950/98 backdrop-blur-xl">
            <div className="px-5 py-6 space-y-2">
              {/* Mobile User */}
              {isLoggedIn && (
                <div className="mb-5 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <Users size={19} className="text-cyan-400" />
                    </div>

                    <div>
                      <p className="font-semibold text-white">
                        {user?.fullName || "User"}
                      </p>

                      <p className="text-xs text-slate-500 capitalize">
                        {user?.role || "patient"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Home */}
              <NavLink to="/" onClick={closeMobile} className={mobileLinkClass}>
                <Stethoscope size={18} />
                Home
              </NavLink>

              {/* Doctors */}
              <NavLink
                to="/doctors"
                onClick={closeMobile}
                className={mobileLinkClass}
              >
                <Users size={18} />
                Doctors
              </NavLink>

              {/* Appointment */}
              <NavLink
                to="/book-appointment"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl ${
                    isActive
                      ? "bg-cyan-500/10 text-cyan-400"
                      : "text-slate-300 hover:bg-white/5"
                  }`
                }
              >
                <CalendarDays size={18} />
                Book Appointment
              </NavLink>
              {/* Dashboard */}
              {isLoggedIn && (
                <NavLink
                  to="/dashboard"
                  onClick={closeMobile}
                  className={mobileLinkClass}
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </NavLink>
              )}

              {/* Admin */}
              {user?.role === "admin" && (
                <NavLink
                  to="/admin"
                  onClick={closeMobile}
                  className={mobileLinkClass}
                >
                  <LayoutDashboard size={18} />
                  Admin Dashboard
                </NavLink>
              )}

              {/* Auth */}
              <div className="pt-5 mt-4 border-t border-white/10">
                {!isLoggedIn ? (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      onClick={closeMobile}
                      className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-300 hover:bg-white/5 hover:text-white transition font-semibold"
                    >
                      <LogIn size={18} />
                      Login
                    </Link>

                    <Link
                      to="/register"
                      onClick={closeMobile}
                      className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition"
                    >
                      <UserPlus size={18} />
                      Get Started
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-400 hover:bg-red-500/10 transition font-semibold"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
