import { Link } from "react-router-dom";
import { Stethoscope, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      {/* =====================================================
          CTA
      ===================================================== */}

      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* =================================================
              BRAND
          ================================================= */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition">
                <Stethoscope size={24} className="text-cyan-400" />
              </div>

              <div>
                <h2 className="text-xl font-black">
                  Medi<span className="text-cyan-400">Flow</span>
                </h2>

                <p className="text-[9px] uppercase tracking-[0.2em] text-slate-500">
                  Healthcare Platform
                </p>
              </div>
            </Link>

            <p className="text-slate-400 leading-relaxed mt-6 max-w-sm">
              A modern healthcare platform designed to make finding doctors and
              managing appointments simple, secure, and convenient.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-7">
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 hover:bg-cyan-400/5 transition"
              >
                f
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 hover:bg-cyan-400/5 transition"
              >
                IG
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 hover:bg-cyan-400/5 transition"
              >
                in
              </a>
            </div>
          </div>

          {/* =================================================
              QUICK LINKS
          ================================================= */}
          <div>
            <h3 className="font-bold text-white text-lg">Quick Links</h3>

            <div className="mt-6 space-y-4">
              <Link
                to="/"
                className="block text-slate-400 hover:text-cyan-400 transition"
              >
                Home
              </Link>

              <Link
                to="/doctors"
                className="block text-slate-400 hover:text-cyan-400 transition"
              >
                Find a Doctor
              </Link>

              <Link
                to="/book-appointment"
                className="block text-slate-400 hover:text-cyan-400 transition"
              >
                Book Appointment
              </Link>

              <Link
                to="/dashboard"
                className="block text-slate-400 hover:text-cyan-400 transition"
              >
                Patient Dashboard
              </Link>
            </div>
          </div>

          {/* =================================================
              SERVICES
          ================================================= */}
          <div>
            <h3 className="font-bold text-white text-lg">Services</h3>

            <div className="mt-6 space-y-4">
              <Link
                to="/doctors"
                className="block text-slate-400 hover:text-cyan-400 transition"
              >
                Doctor Directory
              </Link>

              <Link
                to="/book-appointment"
                className="block text-slate-400 hover:text-cyan-400 transition"
              >
                Appointment Booking
              </Link>

              <Link
                to="/#specialties"
                className="block text-slate-400 hover:text-cyan-400 transition"
              >
                Medical Specialties
              </Link>

              <Link
                to="/#services"
                className="block text-slate-400 hover:text-cyan-400 transition"
              >
                Healthcare Services
              </Link>
            </div>
          </div>

          {/* =================================================
              CONTACT
          ================================================= */}
          <div>
            <h3 className="font-bold text-white text-lg">Contact Us</h3>

            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-3">
                <MapPin size={19} className="text-cyan-400 mt-1 shrink-0" />

                <p className="text-slate-400">
                  Healthcare Support Center
                  <br />
                  Pakistan
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-cyan-400 shrink-0" />

                <a
                  href="tel:+923000000000"
                  className="text-slate-400 hover:text-cyan-400 transition"
                >
                  +92 300 0000000
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-cyan-400 shrink-0" />

                <a
                  href="mailto:support@mediflow.com"
                  className="text-slate-400 hover:text-cyan-400 transition"
                >
                  support@mediflow.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM BAR
      ===================================================== */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 text-center md:text-left">
              © {new Date().getFullYear()} MediFlow. All rights reserved.
            </p>

            <div className="flex items-center gap-6 text-sm">
              <Link
                to="/"
                className="text-slate-500 hover:text-cyan-400 transition"
              >
                Privacy Policy
              </Link>

              <Link
                to="/"
                className="text-slate-500 hover:text-cyan-400 transition"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
