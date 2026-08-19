import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Stethoscope,
  UserRound,
  CheckCircle2,
} from "lucide-react";

import { createAppointment } from "../../services/appointmentService";

export default function BookAppointment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get doctor information from URL
  const doctor = searchParams.get("doctor") || "";
  const specialization = searchParams.get("specialization") || "";

  const [form, setForm] = useState({
    doctorName: doctor,
    specialization: specialization,
    appointmentDate: "",
    appointmentTime: "",
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      doctorName: doctor,
      specialization: specialization,
    }));
  }, [doctor, specialization]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.doctorName) {
      toast.error("Please select a doctor first.");
      return;
    }

    if (!form.appointmentDate) {
      toast.error("Please select an appointment date.");
      return;
    }

    if (!form.appointmentTime) {
      toast.error("Please select an appointment time.");
      return;
    }

    try {
      await createAppointment(form);

      toast.success("Appointment booked successfully!");

      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Unable to book appointment.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white px-6 py-12">
      {/* Back button */}
      <div className="max-w-2xl mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        {/* Main Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/90 backdrop-blur-xl shadow-2xl">
          {/* Decorative glow */}
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative p-8 md:p-10">
            {/* Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 px-4 py-2 text-sm font-semibold text-cyan-400">
                <CalendarDays size={16} />
                Appointment Booking
              </div>

              <h1 className="mt-5 text-3xl md:text-4xl font-black tracking-tight">
                Book an Appointment
              </h1>

              <p className="mt-3 text-slate-400">
                Choose your preferred date and time for your consultation.
              </p>
            </div>

            {/* Selected Doctor */}
            {doctor ? (
              <div className="mb-8 rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-5">
                <div className="flex items-start gap-4">
                  {/* Doctor Icon */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/15 border border-cyan-400/20">
                    <UserRound size={26} className="text-cyan-400" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-cyan-400">
                      Selected Doctor
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-white">
                      {doctor}
                    </h2>

                    {specialization && (
                      <div className="mt-2 inline-flex items-center gap-2 text-sm text-slate-400">
                        <Stethoscope size={15} className="text-cyan-400" />

                        {specialization}
                      </div>
                    )}
                  </div>

                  <div className="ml-auto hidden sm:block">
                    <CheckCircle2 size={22} className="text-green-400" />
                  </div>
                </div>
              </div>
            ) : (
              /* No doctor selected */
              <div className="mb-8 rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-5">
                <p className="font-semibold text-yellow-400">
                  No doctor selected
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Please select a doctor from the Doctors page before booking an
                  appointment.
                </p>

                <button
                  type="button"
                  onClick={() => navigate("/doctors")}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-cyan-400 transition"
                >
                  Find a Doctor
                </button>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Date */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Appointment Date
                </label>

                <div className="relative">
                  <CalendarDays
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 pointer-events-none"
                  />

                  <input
                    type="date"
                    name="appointmentDate"
                    value={form.appointmentDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-4 pl-12 pr-4 text-white outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
                    required
                  />
                </div>
              </div>

              {/* Time */}
              <div className="mb-8">
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Appointment Time
                </label>

                <div className="relative">
                  <Clock3
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 pointer-events-none"
                  />

                  <select
                    name="appointmentTime"
                    value={form.appointmentTime}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-800/80 py-4 pl-12 pr-4 text-white outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
                    required
                  >
                    <option value="">Select Time</option>

                    <option value="09:00 AM">09:00 AM</option>
                    <option value="09:30 AM">09:30 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="10:30 AM">10:30 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>

                    <option value="02:00 PM">02:00 PM</option>
                    <option value="02:30 PM">02:30 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="03:30 PM">03:30 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="04:30 PM">04:30 PM</option>
                  </select>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!doctor}
                className={`group w-full rounded-xl py-4 font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                  doctor
                    ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-0.5"
                    : "bg-slate-700 text-slate-500 cursor-not-allowed"
                }`}
              >
                <CalendarDays size={19} />

                {doctor ? "Confirm Appointment" : "Select a Doctor First"}
              </button>
            </form>

            {/* Security note */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
              <CheckCircle2 size={14} className="text-green-400" />
              Your appointment information is securely processed.
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
