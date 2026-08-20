import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { registerUser } from "../../services/authService";

import {
  Stethoscope,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  HeartPulse,
  CheckCircle2,
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      });

      alert("Account created successfully!");

      navigate("/login");
    } catch (error: any) {
      console.error("Registration error:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Unable to create account.";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-cyan-400/5 rounded-full blur-3xl" />
      </div>

      {/* Top Logo */}
      <header className="relative z-10 px-6 py-6">
        <Link to="/" className="inline-flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition">
            <Stethoscope size={24} className="text-cyan-400" />
          </div>

          <div>
            <h1 className="text-xl font-black tracking-tight">
              Medi<span className="text-cyan-400">Flow</span>
            </h1>

            <p className="text-[9px] uppercase tracking-[0.2em] text-slate-500">
              Healthcare Platform
            </p>
          </div>
        </Link>
      </header>

      {/* Main */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="hidden lg:block"
          >
            <div className="max-w-lg">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-sm font-semibold mb-7">
                <HeartPulse size={17} />
                Your healthcare journey starts here
              </div>

              <h2 className="text-5xl xl:text-6xl font-black leading-[1.05] tracking-tight">
                Create your
                <span className="block text-cyan-400">MediFlow account.</span>
              </h2>

              <p className="text-slate-400 text-lg leading-relaxed mt-7 max-w-md">
                Join MediFlow and make managing your healthcare simpler,
                smarter, and more convenient.
              </p>

              {/* Benefits */}
              <div className="space-y-5 mt-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-cyan-400" size={21} />
                  </div>

                  <div>
                    <h3 className="font-bold">Easy appointment booking</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Find doctors and schedule appointments quickly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-cyan-400" size={21} />
                  </div>

                  <div>
                    <h3 className="font-bold">Manage your healthcare</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Keep your appointments organized in one place.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="text-cyan-400" size={21} />
                  </div>

                  <div>
                    <h3 className="font-bold">Secure & private</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Your account information is protected.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* REGISTER CARD */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="bg-white text-slate-900 rounded-[2rem] p-7 md:p-9 shadow-2xl shadow-black/30 border border-white/10">
              {/* Header */}
              <div className="mb-8">
                <div className="lg:hidden w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center mb-5">
                  <Stethoscope size={26} />
                </div>

                <h1 className="text-3xl md:text-4xl font-black">
                  Create account
                </h1>

                <p className="text-slate-500 mt-2">
                  Get started with MediFlow today.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Full Name
                  </label>

                  <div className="relative">
                    <User
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/10 outline-none transition"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/10 outline-none transition"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Phone Number
                    <span className="text-slate-400 font-normal">
                      {" "}
                      (optional)
                    </span>
                  </label>

                  <div className="relative">
                    <Phone
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+92 300 0000000"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/10 outline-none transition"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/10 outline-none transition"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-500"
                    >
                      {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Confirm Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/10 outline-none transition"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-500"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-60 text-white py-4 rounded-xl font-bold shadow-lg shadow-cyan-500/20 transition"
                >
                  {loading ? "Creating Account..." : "Create Account"}

                  {!loading && <ArrowRight size={19} />}
                </motion.button>
              </form>

              {/* Login */}
              <div className="text-center mt-7 pt-6 border-t border-slate-100">
                <p className="text-sm text-slate-500">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-bold text-cyan-600 hover:text-cyan-700"
                  >
                    Login
                  </Link>
                </p>
              </div>

              {/* Security */}
              <div className="flex items-center justify-center gap-2 mt-5 text-xs text-slate-400">
                <ShieldCheck size={15} className="text-green-500" />
                Your information is securely protected
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
