import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Search,
  Stethoscope,
  Star,
  Clock3,
  CheckCircle2,
  Users,
} from "lucide-react";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { getDoctors } from "../../services/doctorService";

interface Doctor {
  _id: string;
  fullName: string;
  specialization: string;
  experience: number;
  image: string;
  about: string;
  available: boolean;
}

export default function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState(
    searchParams.get("specialization") || "All",
  );

  useEffect(() => {
    async function fetchDoctors() {
      try {
        setLoading(true);

        const { data } = await getDoctors();

        setDoctors(data.doctors || []);
      } catch (error) {
        console.error("Failed to load doctors:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDoctors();
  }, []);

  /* =====================================================
     SPECIALTIES
  ===================================================== */

  const specialties = useMemo(() => {
    const uniqueSpecialties = Array.from(
      new Set(doctors.map((doctor) => doctor.specialization)),
    );

    return ["All", ...uniqueSpecialties];
  }, [doctors]);

  /* =====================================================
     FILTER DOCTORS
  ===================================================== */

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSearch =
        doctor.fullName.toLowerCase().includes(search.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(search.toLowerCase());

      const matchesSpecialization =
        specialization === "All" || doctor.specialization === specialization;

      return matchesSearch && matchesSpecialization;
    });
  }, [doctors, search, specialization]);

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-blue-50 pt-32 pb-20">
        {/* Background decorations */}

        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-cyan-200/40 blur-3xl" />

        <div className="absolute bottom-0 -left-32 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            {/* Badge */}

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-bold">
              <Stethoscope size={17} />
              Find Your Doctor
            </div>

            {/* Heading */}

            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 mt-6">
              Meet Our
              <span className="text-cyan-500"> Specialists</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mt-6 leading-relaxed max-w-2xl">
              Connect with experienced healthcare professionals and find the
              right specialist for your healthcare needs.
            </p>
          </motion.div>

          {/* =====================================================
              SEARCH BOX
          ===================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-10 max-w-4xl"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-3">
              <div className="flex flex-col md:flex-row gap-3">
                {/* Search */}

                <div className="relative flex-1">
                  <Search
                    size={21}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    placeholder="Search doctor or specialization..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-5 py-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition text-slate-800"
                  />
                </div>

                {/* Specialty */}

                <select
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="md:w-64 px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition text-slate-700 font-medium"
                >
                  {specialties.map((item) => (
                    <option key={item} value={item}>
                      {item === "All" ? "All Specialties" : item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          DOCTOR STATISTICS
      ===================================================== */}

      <section className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-lg p-5">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
                <Users size={21} />
              </div>

              <div>
                <p className="text-2xl font-black text-slate-900">
                  {doctors.length}
                </p>

                <p className="text-sm text-slate-500">Doctors</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-lg p-5">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Stethoscope size={21} />
              </div>

              <div>
                <p className="text-2xl font-black text-slate-900">
                  {specialties.length > 0 ? specialties.length - 1 : 0}
                </p>

                <p className="text-sm text-slate-500">Specialties</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-lg p-5">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                <CheckCircle2 size={21} />
              </div>

              <div>
                <p className="text-2xl font-black text-slate-900">
                  {doctors.filter((doctor) => doctor.available).length}
                </p>

                <p className="text-sm text-slate-500">Available</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-lg p-5">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
                <Star size={21} />
              </div>

              <div>
                <p className="text-2xl font-black text-slate-900">24/7</p>

                <p className="text-sm text-slate-500">Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          DOCTORS
      ===================================================== */}

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        {/* Heading */}

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <p className="text-cyan-500 font-bold uppercase tracking-[0.18em] text-sm">
              Our Specialists
            </p>

            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3">
              Healthcare professionals
            </h2>

            <p className="text-slate-500 mt-4">
              {loading
                ? "Finding our doctors..."
                : `${filteredDoctors.length} doctor${
                    filteredDoctors.length !== 1 ? "s" : ""
                  } available`}
            </p>
          </div>
        </div>

        {/* Loading */}

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-slate-100 bg-white overflow-hidden shadow-sm animate-pulse"
              >
                <div className="h-72 bg-slate-100" />

                <div className="p-6">
                  <div className="h-6 bg-slate-100 rounded w-3/4" />

                  <div className="h-4 bg-slate-100 rounded w-1/2 mt-4" />

                  <div className="h-4 bg-slate-100 rounded w-full mt-5" />

                  <div className="h-12 bg-slate-100 rounded-xl mt-6" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredDoctors.length === 0 ? (
          /* =====================================================
             EMPTY STATE
          ===================================================== */

          <div className="text-center py-20">
            <div className="mx-auto h-20 w-20 rounded-3xl bg-cyan-50 text-cyan-500 flex items-center justify-center">
              <Search size={32} />
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-6">
              No doctors found
            </h3>

            <p className="text-slate-500 mt-2">
              Try another doctor name or specialty.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setSpecialization("All");
              }}
              className="mt-6 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          /* =====================================================
             DOCTOR GRID
          ===================================================== */

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredDoctors.map((doctor, index) => (
              <motion.article
                key={doctor._id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.07,
                }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-cyan-100 transition-all duration-300"
              >
                {/* Doctor Image */}

                <div className="relative h-72 overflow-hidden bg-slate-100">
                  <img
                    src={doctor.image || "https://i.pravatar.cc/600?img=12"}
                    alt={doctor.fullName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient */}

                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/60 to-transparent" />

                  {/* Availability */}

                  <div
                    className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md border ${
                      doctor.available
                        ? "bg-green-500/90 text-white border-green-400/30"
                        : "bg-slate-800/80 text-slate-200 border-white/10"
                    }`}
                  >
                    {doctor.available ? "Available" : "Unavailable"}
                  </div>

                  {/* Specialty */}

                  <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur text-cyan-700 text-xs font-bold">
                      <Stethoscope size={14} />

                      {doctor.specialization}
                    </span>
                  </div>
                </div>

                {/* Content */}

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-cyan-600 transition">
                        {doctor.fullName}
                      </h3>

                      <p className="text-cyan-500 font-semibold mt-1">
                        {doctor.specialization}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star size={16} fill="currentColor" />

                      <span className="text-sm font-bold text-slate-700">
                        4.9
                      </span>
                    </div>
                  </div>

                  {/* Experience */}

                  <div className="flex items-center gap-2 mt-5 text-slate-500 text-sm">
                    <Clock3 size={17} className="text-cyan-500" />

                    <span>{doctor.experience} years of experience</span>
                  </div>

                  {/* About */}

                  <p className="text-slate-500 text-sm leading-relaxed mt-4 line-clamp-3">
                    {doctor.about ||
                      "Experienced healthcare professional dedicated to providing quality patient care."}
                  </p>

                  {/* Button */}

                  <Link
                    to={`/book-appointment?doctor=${encodeURIComponent(
                      doctor.fullName,
                    )}&specialization=${encodeURIComponent(
                      doctor.specialization,
                    )}`}
                    className={`premium-button mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold transition ${
                      doctor.available
                        ? "bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/20"
                        : "bg-slate-100 text-slate-400 pointer-events-none"
                    }`}
                  >
                    {doctor.available
                      ? "Book Appointment"
                      : "Currently Unavailable"}

                    {doctor.available && <ArrowRight size={18} />}
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto rounded-[2rem] bg-slate-900 overflow-hidden relative"
        >
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl" />

          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

          <div className="relative px-8 md:px-16 py-14 text-center">
            <p className="text-cyan-400 font-bold uppercase tracking-wider text-sm">
              Your Health Matters
            </p>

            <h2 className="text-3xl md:text-4xl font-black text-white mt-3">
              Can't find the right doctor?
            </h2>

            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
              Contact our support team and we'll help you find the right
              healthcare professional.
            </p>

            <Link
              to="/book-appointment"
              className="premium-button inline-flex items-center gap-2 mt-7 bg-cyan-500 hover:bg-cyan-400 text-white px-7 py-4 rounded-xl font-bold shadow-lg shadow-cyan-500/20"
            >
              Book an Appointment
              <ArrowRight size={19} />
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
