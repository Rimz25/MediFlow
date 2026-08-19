import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import {
  getAppointments,
  cancelAppointment,
  rescheduleAppointment,
} from "../../services/appointmentService";
import { toast } from "react-toastify";
import { CalendarDays, Clock, RefreshCw, XCircle } from "lucide-react";

export default function Dashboard() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [rescheduleId, setRescheduleId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const loadAppointments = async () => {
    try {
      setLoading(true);

      const { data } = await getAppointments();

      setAppointments(data.appointments || []);
    } catch (error: any) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Unable to load appointments.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  // Cancel appointment
  const handleCancel = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this appointment?",
    );

    if (!confirmed) return;

    try {
      await cancelAppointment(id);

      toast.success("Appointment cancelled successfully.");

      await loadAppointments();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Unable to cancel appointment.",
      );
    }
  };

  // Open reschedule form
  const openReschedule = (appointment: any) => {
    setRescheduleId(appointment._id);

    const date = new Date(appointment.appointmentDate);

    const formattedDate = date.toISOString().split("T")[0];

    setNewDate(formattedDate);
    setNewTime(appointment.appointmentTime);
  };

  // Reschedule appointment
  const handleReschedule = async (id: string) => {
    if (!newDate || !newTime) {
      toast.error("Please select a date and time.");
      return;
    }

    try {
      await rescheduleAppointment(id, {
        appointmentDate: newDate,
        appointmentTime: newTime,
      });

      toast.success("Appointment rescheduled successfully.");

      setRescheduleId(null);
      setNewDate("");
      setNewTime("");

      await loadAppointments();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Unable to reschedule appointment.",
      );
    }
  };

  const pendingCount = appointments.filter(
    (appointment) => appointment.status === "Pending",
  ).length;

  const confirmedCount = appointments.filter(
    (appointment) => appointment.status === "Confirmed",
  ).length;

  const completedCount = appointments.filter(
    (appointment) => appointment.status === "Completed",
  ).length;

  const cancelledCount = appointments.filter(
    (appointment) => appointment.status === "Cancelled",
  ).length;

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-500/15 text-green-400 border-green-500/30";

      case "Completed":
        return "bg-blue-500/15 text-blue-400 border-blue-500/30";

      case "Cancelled":
        return "bg-red-500/15 text-red-400 border-red-500/30";

      default:
        return "bg-yellow-500/15 text-yellow-400 border-yellow-500/30";
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
          <div>
            <p className="text-cyan-400 font-semibold mb-2">Welcome back</p>

            <h1 className="text-4xl md:text-5xl font-black">My Dashboard</h1>

            <p className="text-slate-400 mt-2">
              Manage your medical appointments easily.
            </p>
          </div>

          <Link
            to="/doctors"
            className="inline-flex items-center justify-center bg-cyan-500 hover:bg-cyan-400 px-6 py-3 rounded-xl font-bold transition"
          >
            + Book Appointment
          </Link>
        </div>

        {/* Statistics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <p className="text-slate-400">Total</p>
            <h2 className="text-4xl font-black mt-2">{appointments.length}</h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <p className="text-slate-400">Pending</p>
            <h2 className="text-4xl font-black mt-2 text-yellow-400">
              {pendingCount}
            </h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <p className="text-slate-400">Confirmed</p>
            <h2 className="text-4xl font-black mt-2 text-green-400">
              {confirmedCount}
            </h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <p className="text-slate-400">Completed</p>
            <h2 className="text-4xl font-black mt-2 text-blue-400">
              {completedCount}
            </h2>
          </div>
        </div>

        {/* Appointments */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">My Appointments</h2>

              <p className="text-slate-400 mt-1">
                View and manage your appointments.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">
              <p className="text-slate-400">Loading appointments...</p>
            </div>
          ) : appointments.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">
              <CalendarDays size={50} className="mx-auto text-slate-600 mb-4" />

              <h3 className="text-xl font-bold">No appointments found</h3>

              <p className="text-slate-400 mt-2 mb-6">
                You haven't booked an appointment yet.
              </p>

              <Link
                to="/doctors"
                className="inline-block bg-cyan-500 hover:bg-cyan-400 px-6 py-3 rounded-xl font-bold"
              >
                Find a Doctor
              </Link>
            </div>
          ) : (
            <div className="grid gap-5">
              {appointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 transition"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* Doctor */}
                    <div>
                      <h3 className="text-2xl font-bold text-cyan-400">
                        {appointment.doctorName}
                      </h3>

                      <p className="text-slate-400 mt-1">
                        {appointment.specialization}
                      </p>

                      <div className="flex flex-wrap gap-5 mt-5 text-slate-300">
                        <span className="flex items-center gap-2">
                          <CalendarDays size={18} />
                          {new Date(
                            appointment.appointmentDate,
                          ).toLocaleDateString()}
                        </span>

                        <span className="flex items-center gap-2">
                          <Clock size={18} />
                          {appointment.appointmentTime}
                        </span>
                      </div>
                    </div>

                    {/* Right side */}
                    <div className="flex flex-col items-start lg:items-end gap-4">
                      <span
                        className={`px-4 py-2 rounded-full border text-sm font-semibold ${getStatusStyle(
                          appointment.status,
                        )}`}
                      >
                        {appointment.status}
                      </span>

                      {/* Actions */}
                      {appointment.status !== "Cancelled" &&
                        appointment.status !== "Completed" && (
                          <div className="flex flex-wrap gap-3">
                            <button
                              onClick={() => openReschedule(appointment)}
                              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 hover:border-cyan-400 hover:text-cyan-400 transition"
                            >
                              <RefreshCw size={16} />
                              Reschedule
                            </button>

                            <button
                              onClick={() => handleCancel(appointment._id)}
                              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition"
                            >
                              <XCircle size={16} />
                              Cancel
                            </button>
                          </div>
                        )}
                    </div>
                  </div>

                  {/* Reschedule Form */}
                  {rescheduleId === appointment._id && (
                    <div className="mt-6 pt-6 border-t border-slate-800">
                      <h4 className="font-bold text-lg mb-4">
                        Reschedule Appointment
                      </h4>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-slate-400 mb-2">
                            New Date
                          </label>

                          <input
                            type="date"
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-slate-400 mb-2">
                            New Time
                          </label>

                          <select
                            value={newTime}
                            onChange={(e) => setNewTime(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
                          >
                            <option value="">Select Time</option>

                            <option>09:00 AM</option>
                            <option>09:30 AM</option>
                            <option>10:00 AM</option>
                            <option>10:30 AM</option>
                            <option>11:00 AM</option>
                            <option>11:30 AM</option>
                            <option>02:00 PM</option>
                            <option>02:30 PM</option>
                            <option>03:00 PM</option>
                            <option>03:30 PM</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-5">
                        <button
                          onClick={() => handleReschedule(appointment._id)}
                          className="bg-cyan-500 hover:bg-cyan-400 px-5 py-2 rounded-lg font-bold"
                        >
                          Save Changes
                        </button>

                        <button
                          onClick={() => {
                            setRescheduleId(null);
                            setNewDate("");
                            setNewTime("");
                          }}
                          className="border border-slate-700 px-5 py-2 rounded-lg hover:bg-slate-800"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Cancelled count */}
          {cancelledCount > 0 && (
            <p className="text-slate-500 text-sm mt-6">
              You have {cancelledCount} cancelled appointment
              {cancelledCount !== 1 ? "s" : ""}.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
