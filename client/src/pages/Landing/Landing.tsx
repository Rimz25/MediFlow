import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";

import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  HeartPulse,
  Search,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";

export default function Landing() {
  // =========================================================
  // MEDICAL SPECIALTIES
  // =========================================================

  const specialties = [
    {
      name: "Dentistry",
      description: "Dental and oral healthcare",
    },
    {
      name: "Cardiology",
      description: "Heart and cardiovascular care",
    },
    {
      name: "Dermatology",
      description: "Skin and cosmetic care",
    },
    {
      name: "Pediatrics",
      description: "Healthcare for children",
    },
    {
      name: "Neurology",
      description: "Brain and nervous system care",
    },
    {
      name: "Orthopedics",
      description: "Bones, joints and mobility",
    },
  ];

  // =========================================================
  // HOW MEDIFLOW WORKS
  // =========================================================

  const services = [
    {
      icon: <CalendarCheck size={28} />,
      number: "01",
      title: "Book an Appointment",
      description:
        "Choose a healthcare professional and schedule an appointment that works for you.",
    },
    {
      icon: <Stethoscope size={28} />,
      number: "02",
      title: "Meet Your Doctor",
      description:
        "Connect with qualified healthcare professionals based on your medical needs.",
    },
    {
      icon: <HeartPulse size={28} />,
      number: "03",
      title: "Manage Your Care",
      description:
        "Keep track of your appointments and manage your healthcare journey in one place.",
    },
  ];

  // =========================================================
  // STATISTICS
  // =========================================================

  const stats = [
    {
      value: "5,000+",
      label: "Patients",
    },
    {
      value: "120+",
      label: "Doctors",
    },
    {
      value: "20+",
      label: "Specialties",
    },
    {
      value: "24/7",
      label: "Support",
    },
  ];

  // =========================================================
  // ANIMATION VARIANTS
  // =========================================================

  const fadeUp: Variants = {
    hidden: {
      opacity: 0,
      y: 35,
    },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer: Variants = {
    hidden: {},

    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 overflow-x-hidden">
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Navbar />

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="relative overflow-hidden bg-linear-to-br from-cyan-50 via-white to-blue-50 pt-20">
        {/* Background Glow - Top Right */}

        <div className="absolute -top-40 -right-40 w-125 h-125 rounded-full bg-cyan-300/20 blur-3xl pointer-events-none" />

        {/* Background Glow - Bottom Left */}

        <div className="absolute -bottom-40 -left-40 w-112.5 h-112.5rounded-full bg-blue-300/20 blur-3xl pointer-events-none" />

        {/* Subtle Grid */}

        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#0891b2 1px, transparent 1px), linear-gradient(90deg, #0891b2 1px, transparent 1px)",
            backgroundSize: "45px 45px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* =================================================
                HERO TEXT
            ================================================= */}

            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {/* Badge */}

              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 border border-cyan-200 text-cyan-700 text-sm font-bold"
              >
                <HeartPulse size={17} />

                <span>Modern Healthcare, Simplified</span>
              </motion.div>

              {/* Heading */}

              <motion.h1
                variants={fadeUp}
                className="mt-7 text-5xl md:text-6xl lg:text-7xl font-black leading-[1.02] tracking-tight text-slate-950"
              >
                Your Health.
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-500 to-blue-600">
                  Our Priority.
                </span>
              </motion.h1>

              {/* Description */}

              <motion.p
                variants={fadeUp}
                className="mt-7 text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl"
              >
                Find trusted doctors, explore medical specialties, and book
                appointments with ease — all through one simple healthcare
                platform.
              </motion.p>

              {/* CTA Buttons */}

              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-4 mt-9"
              >
                <Link
                  to="/doctors"
                  className="group inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-7 py-4 rounded-xl font-bold transition-all duration-300 shadow-xl shadow-cyan-500/20 hover:-translate-y-1 hover:shadow-cyan-500/30"
                >
                  Find a Doctor
                  <ArrowRight
                    size={19}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>

                <Link
                  to="/register"
                  className="group inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-cyan-400 px-7 py-4 rounded-xl font-bold text-slate-700 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-lg"
                >
                  Get Started
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </motion.div>

              {/* Trust Points */}

              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-7 mt-9 text-sm text-slate-500"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck size={19} className="text-cyan-500" />

                  <span>Secure Platform</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock3 size={19} className="text-cyan-500" />

                  <span>Easy Booking</span>
                </div>

                <div className="flex items-center gap-2">
                  <Users size={19} className="text-cyan-500" />

                  <span>Patient Focused</span>
                </div>
              </motion.div>
            </motion.div>

            {/* =================================================
                HERO CARD
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                x: 45,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.15,
              }}
              className="relative"
            >
              <div className="bg-white rounded-4xl shadow-2xl shadow-slate-300/40 border border-slate-100 p-7 md:p-9">
                {/* Card Header */}

                <div className="flex items-center justify-between mb-7">
                  <div>
                    <p className="text-sm text-slate-400">Healthcare at</p>

                    <h2 className="text-2xl font-bold text-slate-900">
                      Your Fingertips
                    </h2>
                  </div>

                  <motion.div
                    animate={{
                      y: [0, -6, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="h-12 w-12 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center"
                  >
                    <HeartPulse size={25} />
                  </motion.div>
                </div>

                {/* Find Doctor */}

                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5 mb-5">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 shrink-0">
                      <Stethoscope size={25} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900">
                        Find Your Doctor
                      </p>

                      <p className="text-sm text-slate-500">
                        Search by specialty
                      </p>
                    </div>

                    <Search size={20} className="text-slate-400 shrink-0" />
                  </div>
                </div>

                {/* Action Cards */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link
                    to="/doctors"
                    className="group rounded-2xl bg-cyan-500 hover:bg-cyan-600 text-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/20"
                  >
                    <Stethoscope size={24} />

                    <p className="font-bold mt-4">Doctors</p>

                    <p className="text-sm text-cyan-100 mt-1">
                      Browse specialists
                    </p>

                    <ArrowRight
                      size={18}
                      className="mt-4 group-hover:translate-x-1 transition-transform"
                    />
                  </Link>

                  <Link
                    to="/book-appointment"
                    className="group rounded-2xl bg-slate-900 hover:bg-slate-800 text-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <CalendarCheck size={24} />

                    <p className="font-bold mt-4">Book Now</p>

                    <p className="text-sm text-slate-400 mt-1">
                      Schedule your visit
                    </p>

                    <ArrowRight
                      size={18}
                      className="mt-4 group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>

                {/* Security Row */}

                <div className="mt-5 flex items-center gap-3 rounded-2xl bg-green-50 border border-green-100 px-4 py-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                    <ShieldCheck size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900">
                      Secure Healthcare Platform
                    </p>

                    <p className="text-xs text-slate-500">
                      Your information is protected
                    </p>
                  </div>

                  <CheckCircle2
                    size={20}
                    className="ml-auto text-green-500 shrink-0"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section className="relative py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <p className="text-cyan-500 font-bold uppercase tracking-[0.2em] text-sm">
              How MediFlow Works
            </p>

            <h2 className="text-4xl md:text-5xl font-black text-slate-950 mt-3">
              Healthcare made simple
            </h2>

            <p className="text-slate-500 mt-5 text-lg">
              From finding a doctor to managing your appointments, MediFlow
              keeps everything in one place.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-7"
          >
            {services.map((service) => (
              <motion.div
                key={service.number}
                variants={fadeUp}
                whileHover={{
                  y: -7,
                }}
                className="relative bg-white border border-slate-200 rounded-3xl p-8 shadow-lg shadow-slate-200/40 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
              >
                {/* Number */}

                <div className="absolute top-6 right-7 text-4xl font-black text-slate-100">
                  {service.number}
                </div>

                {/* Icon */}

                <div className="h-14 w-14 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                  {service.icon}
                </div>

                {/* Title */}

                <h3 className="text-xl font-bold text-slate-900 mt-6">
                  {service.title}
                </h3>

                {/* Description */}

                <p className="text-slate-500 leading-relaxed mt-3">
                  {service.description}
                </p>

                {/* Learn More */}

                <div className="flex items-center gap-2 text-cyan-600 text-sm font-bold mt-6">
                  <span>Learn more</span>

                  <ArrowRight size={16} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          SPECIALTIES
      ===================================================== */}

      <section
        id="specialties"
        className="bg-slate-50 border-y border-slate-100"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={fadeUp}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12"
          >
            <div>
              <p className="text-cyan-500 font-bold uppercase tracking-[0.2em] text-sm">
                Medical Specialties
              </p>

              <h2 className="text-4xl md:text-5xl font-black text-slate-950 mt-3">
                Find care for your needs
              </h2>

              <p className="text-slate-500 mt-4 max-w-2xl text-lg">
                Explore our medical specialties and connect with the right
                healthcare professional.
              </p>
            </div>

            <Link
              to="/doctors"
              className="group mt-6 md:mt-0 text-cyan-600 font-bold flex items-center gap-2"
            >
              Browse Specialists
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
            }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5"
          >
            {specialties.map((specialty) => (
              <motion.div
                key={specialty.name}
                variants={fadeUp}
                whileHover={{
                  y: -6,
                }}
              >
                <Link
                  to={`/doctors?specialization=${encodeURIComponent(
                    specialty.name,
                  )}`}
                  className="group block h-full p-6 rounded-2xl bg-white border border-slate-200 shadow-md shadow-slate-200/30 hover:border-cyan-300 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
                >
                  {/* Icon */}

                  <div className="h-12 w-12 rounded-xl bg-cyan-50 group-hover:bg-cyan-100 text-cyan-500 flex items-center justify-center transition">
                    <Stethoscope size={23} />
                  </div>

                  {/* Name */}

                  <p className="font-bold text-slate-900 mt-5">
                    {specialty.name}
                  </p>

                  {/* Description */}

                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {specialty.description}
                  </p>

                  {/* Explore */}

                  <div className="flex items-center gap-1 mt-5 text-cyan-600">
                    <span className="text-xs font-bold">Explore</span>

                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          WHY MEDIFLOW
      ===================================================== */}

      <section id="services" className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <p className="text-cyan-500 font-bold uppercase tracking-[0.2em] text-sm">
              Why MediFlow
            </p>

            <h2 className="text-4xl md:text-5xl font-black text-slate-950 mt-3">
              Healthcare designed around you
            </h2>

            <p className="text-slate-500 mt-5 text-lg">
              Everything you need to make managing your healthcare simpler,
              faster and more convenient.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-7">
            {/* =================================================
                CARD 1
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
              }}
              whileHover={{
                y: -7,
              }}
              className="rounded-3xl p-8 bg-white border border-slate-200 shadow-lg shadow-slate-200/40 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
            >
              <div className="h-14 w-14 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
                <CalendarCheck size={28} />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mt-6">
                Easy Appointment Booking
              </h3>

              <p className="text-slate-500 leading-relaxed mt-3">
                Find available doctors and schedule your appointment without
                unnecessary steps.
              </p>
            </motion.div>

            {/* =================================================
                CARD 2
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
                delay: 0.1,
              }}
              whileHover={{
                y: -7,
              }}
              className="rounded-3xl p-8 bg-white border border-slate-200 shadow-lg shadow-slate-200/40 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
            >
              <div className="h-14 w-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Stethoscope size={28} />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mt-6">
                Qualified Doctors
              </h3>

              <p className="text-slate-500 leading-relaxed mt-3">
                Explore doctors by specialty and choose a healthcare
                professional suited to your needs.
              </p>
            </motion.div>

            {/* =================================================
                CARD 3
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
              whileHover={{
                y: -7,
              }}
              className="rounded-3xl p-8 bg-white border border-slate-200 shadow-lg shadow-slate-200/40 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
            >
              <div className="h-14 w-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
                <ShieldCheck size={28} />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mt-6">
                Secure & Private
              </h3>

              <p className="text-slate-500 leading-relaxed mt-3">
                Your account and appointment information are protected with
                secure authentication.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <section className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="text-center mb-12"
          >
            <p className="text-cyan-500 font-bold uppercase tracking-[0.2em] text-sm">
              MediFlow by the numbers
            </p>

            <h2 className="text-3xl md:text-4xl font-black text-slate-950 mt-3">
              Trusted healthcare, simplified
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{
                  opacity: 0,
                  scale: 0.95,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -5,
                }}
                className="text-center p-7 md:p-8 rounded-3xl bg-white border border-slate-200 shadow-lg shadow-slate-200/40 hover:shadow-xl transition-all duration-300"
              >
                <p className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-cyan-500 to-blue-600">
                  {stat.value}
                </p>

                <p className="mt-3 text-slate-500 font-semibold">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="px-6 py-24 bg-white">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="max-w-6xl mx-auto rounded-4xl bg-linear-to-br from-slate-950 via-slate-900 to-cyan-950 overflow-hidden relative shadow-2xl"
        >
          {/* Background Glow */}

          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative px-8 md:px-16 py-16 md:py-20 text-center">
            {/* Badge */}

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-sm font-bold">
              <HeartPulse size={16} />

              <span>YOUR HEALTH MATTERS</span>
            </div>

            {/* Heading */}

            <h2 className="text-4xl md:text-5xl font-black text-white mt-6">
              Ready to take the next step?
            </h2>

            {/* Description */}

            <p className="text-slate-400 mt-5 max-w-2xl mx-auto text-lg leading-relaxed">
              Find the right healthcare professional and take control of your
              healthcare journey with MediFlow.
            </p>

            {/* CTA Buttons */}

            <div className="flex flex-wrap justify-center gap-4 mt-9">
              <Link
                to="/doctors"
                className="group inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:-translate-y-1 shadow-xl shadow-cyan-500/20"
              >
                Browse Doctors
                <ArrowRight
                  size={19}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>

              <Link
                to="/book-appointment"
                className="group inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:-translate-y-1"
              >
                Book an Appointment
                <CalendarCheck
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer />
    </div>
  );
}
