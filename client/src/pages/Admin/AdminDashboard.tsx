import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";

import {
  getAdminStats,
  getAllAppointments,
  updateAppointmentStatus,
} from "../../services/adminService";

import {
  getAdminDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  toggleDoctorAvailability,
} from "../../services/doctorAdminService";

import { toast } from "react-toastify";

import {
  Users,
  Stethoscope,
  CalendarDays,
  CheckCircle,
  Plus,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

export default function AdminDashboard() {
  // ==========================================
  // STATISTICS
  // ==========================================

  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    completedAppointments: 0,
    pendingAppointments: 0,
    confirmedAppointments: 0,
    cancelledAppointments: 0,
  });

  // ==========================================
  // APPOINTMENTS
  // ==========================================

  const [appointments, setAppointments] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  // ==========================================
  // DOCTORS
  // ==========================================

  const [doctors, setDoctors] = useState<any[]>([]);

  const [doctorLoading, setDoctorLoading] = useState(true);

  // ==========================================
  // DOCTOR MODAL
  // ==========================================

  const [showDoctorForm, setShowDoctorForm] = useState(false);

  const [editingDoctor, setEditingDoctor] = useState<any>(null);

  const [doctorForm, setDoctorForm] = useState({
    fullName: "",
    specialization: "",
    experience: "",
    image: "",
    about: "",
    available: true,
  });

  // ==========================================
  // LOAD DASHBOARD
  // ==========================================

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [statsResponse, appointmentsResponse] = await Promise.all([
        getAdminStats(),
        getAllAppointments(),
      ]);

      setStats(
        statsResponse.data.stats || {
          totalPatients: 0,
          totalDoctors: 0,
          totalAppointments: 0,
          completedAppointments: 0,
          pendingAppointments: 0,
          confirmedAppointments: 0,
          cancelledAppointments: 0,
        },
      );

      setAppointments(appointmentsResponse.data.appointments || []);
    } catch (error: any) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Unable to load admin dashboard.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD DOCTORS
  // ==========================================

  const loadDoctors = async () => {
    try {
      setDoctorLoading(true);

      const { data } = await getAdminDoctors();

      setDoctors(data.doctors || []);
    } catch (error: any) {
      console.error(error);

      toast.error(error.response?.data?.message || "Unable to load doctors.");
    } finally {
      setDoctorLoading(false);
    }
  };

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    loadDashboard();
    loadDoctors();
  }, []);

  // ==========================================
  // APPOINTMENT STATUS
  // ==========================================

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateAppointmentStatus(id, status);

      toast.success("Appointment status updated.");

      await loadDashboard();
    } catch (error: any) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Unable to update appointment.",
      );
    }
  };

  // ==========================================
  // STATUS STYLE
  // ==========================================

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

  // ==========================================
  // DOCTOR FORM CHANGE
  // ==========================================

  const handleDoctorChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setDoctorForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // OPEN ADD DOCTOR
  // ==========================================

  const openAddDoctor = () => {
    setEditingDoctor(null);

    setDoctorForm({
      fullName: "",
      specialization: "",
      experience: "",
      image: "",
      about: "",
      available: true,
    });

    setShowDoctorForm(true);
  };

  // ==========================================
  // OPEN EDIT DOCTOR
  // ==========================================

  const openEditDoctor = (doctor: any) => {
    setEditingDoctor(doctor);

    setDoctorForm({
      fullName: doctor.fullName || "",
      specialization: doctor.specialization || "",
      experience: String(doctor.experience ?? ""),
      image: doctor.image || "",
      about: doctor.about || "",
      available: doctor.available ?? true,
    });

    setShowDoctorForm(true);
  };

  // ==========================================
  // SUBMIT DOCTOR
  // ==========================================

  const handleDoctorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !doctorForm.fullName.trim() ||
      !doctorForm.specialization.trim() ||
      doctorForm.experience === ""
    ) {
      toast.error("Please fill in all required fields.");

      return;
    }

    try {
      const data = {
        fullName: doctorForm.fullName.trim(),

        specialization: doctorForm.specialization.trim(),

        experience: Number(doctorForm.experience),

        image: doctorForm.image.trim(),

        about: doctorForm.about.trim(),

        available: doctorForm.available,
      };

      if (editingDoctor) {
        await updateDoctor(editingDoctor._id, data);

        toast.success("Doctor updated successfully.");
      } else {
        await createDoctor(data);

        toast.success("Doctor added successfully.");
      }

      setShowDoctorForm(false);

      setEditingDoctor(null);

      await loadDoctors();

      await loadDashboard();
    } catch (error: any) {
      console.error(error);

      toast.error(error.response?.data?.message || "Unable to save doctor.");
    }
  };

  // ==========================================
  // DELETE DOCTOR
  // ==========================================

  const handleDeleteDoctor = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this doctor?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteDoctor(id);

      toast.success("Doctor deleted successfully.");

      await loadDoctors();

      await loadDashboard();
    } catch (error: any) {
      console.error(error);

      toast.error(error.response?.data?.message || "Unable to delete doctor.");
    }
  };

  // ==========================================
  // TOGGLE AVAILABILITY
  // ==========================================

  const handleToggleAvailability = async (id: string) => {
    try {
      await toggleDoctorAvailability(id);

      toast.success("Doctor availability updated.");

      await loadDoctors();
    } catch (error: any) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Unable to update availability.",
      );
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* ======================================
            HEADER
        ====================================== */}

        <div className="mb-10">
          <p className="text-cyan-400 font-semibold mb-2">Administration</p>

          <h1 className="text-4xl md:text-5xl font-black">Admin Dashboard</h1>

          <p className="text-slate-400 mt-2">
            Manage MediFlow patients, doctors and appointments.
          </p>
        </div>

        {/* ======================================
            STATISTICS
        ====================================== */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {/* Patients */}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400">Total Patients</p>

                <h2 className="text-4xl font-black mt-3">
                  {stats.totalPatients}
                </h2>
              </div>

              <Users className="text-cyan-400" size={30} />
            </div>
          </div>

          {/* Doctors */}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400">Total Doctors</p>

                <h2 className="text-4xl font-black mt-3">
                  {stats.totalDoctors}
                </h2>
              </div>

              <Stethoscope className="text-purple-400" size={30} />
            </div>
          </div>

          {/* Appointments */}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400">Appointments</p>

                <h2 className="text-4xl font-black mt-3">
                  {stats.totalAppointments}
                </h2>
              </div>

              <CalendarDays className="text-yellow-400" size={30} />
            </div>
          </div>

          {/* Completed */}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400">Completed</p>

                <h2 className="text-4xl font-black mt-3 text-green-400">
                  {stats.completedAppointments}
                </h2>
              </div>

              <CheckCircle className="text-green-400" size={30} />
            </div>
          </div>
        </div>

        {/* ======================================
            APPOINTMENT SUMMARY
        ====================================== */}

        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <p className="text-slate-400">Pending</p>

            <p className="text-3xl font-bold text-yellow-400 mt-2">
              {stats.pendingAppointments}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <p className="text-slate-400">Confirmed</p>

            <p className="text-3xl font-bold text-green-400 mt-2">
              {stats.confirmedAppointments}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <p className="text-slate-400">Cancelled</p>

            <p className="text-3xl font-bold text-red-400 mt-2">
              {stats.cancelledAppointments}
            </p>
          </div>
        </div>

        {/* ======================================
            ALL APPOINTMENTS
        ====================================== */}

        <section>
          <div className="mb-5">
            <h2 className="text-2xl font-bold">All Appointments</h2>

            <p className="text-slate-400 mt-1">Manage appointment status.</p>
          </div>

          {loading ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">
              <p className="text-slate-400">Loading appointments...</p>
            </div>
          ) : appointments.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">
              <p className="text-slate-400">No appointments found.</p>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-800/50">
                    <tr className="text-left text-slate-400 text-sm">
                      <th className="p-5">Patient</th>

                      <th className="p-5">Doctor</th>

                      <th className="p-5">Date</th>

                      <th className="p-5">Time</th>

                      <th className="p-5">Status</th>

                      <th className="p-5">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {appointments.map((appointment) => (
                      <tr
                        key={appointment._id}
                        className="border-t border-slate-800 hover:bg-slate-800/30 transition"
                      >
                        {/* Patient */}

                        <td className="p-5">
                          <p className="font-semibold">
                            {appointment.patient?.fullName || "Unknown"}
                          </p>

                          <p className="text-sm text-slate-500 mt-1">
                            {appointment.patient?.email || ""}
                          </p>
                        </td>

                        {/* Doctor */}

                        <td className="p-5">
                          <p className="font-semibold">
                            {appointment.doctorName}
                          </p>

                          <p className="text-sm text-cyan-400 mt-1">
                            {appointment.specialization}
                          </p>
                        </td>

                        {/* Date */}

                        <td className="p-5 text-slate-300">
                          {new Date(
                            appointment.appointmentDate,
                          ).toLocaleDateString()}
                        </td>

                        {/* Time */}

                        <td className="p-5 text-slate-300">
                          {appointment.appointmentTime}
                        </td>

                        {/* Status */}

                        <td className="p-5">
                          <span
                            className={`inline-block px-3 py-1 rounded-full border text-sm font-semibold ${getStatusStyle(
                              appointment.status,
                            )}`}
                          >
                            {appointment.status}
                          </span>
                        </td>

                        {/* Action */}

                        <td className="p-5">
                          <select
                            value={appointment.status}
                            onChange={(e) =>
                              handleStatusChange(
                                appointment._id,
                                e.target.value,
                              )
                            }
                            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-400"
                          >
                            <option value="Pending">Pending</option>

                            <option value="Confirmed">Confirmed</option>

                            <option value="Completed">Completed</option>

                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* ======================================
            DOCTOR MANAGEMENT
        ====================================== */}

        <section className="mt-14">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold">Doctor Management</h2>

              <p className="text-slate-400 mt-1">
                Add, edit and manage MediFlow doctors.
              </p>
            </div>

            <button
              onClick={openAddDoctor}
              className="flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white px-5 py-3 rounded-xl font-semibold transition"
            >
              <Plus size={20} />
              Add Doctor
            </button>
          </div>

          {/* Loading */}

          {doctorLoading ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">
              <p className="text-slate-400">Loading doctors...</p>
            </div>
          ) : doctors.length === 0 ? (
            /* Empty State */

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">
              <Stethoscope size={50} className="mx-auto text-slate-600 mb-4" />

              <p className="text-slate-400">No doctors found.</p>

              <button
                onClick={openAddDoctor}
                className="mt-5 bg-cyan-500 hover:bg-cyan-400 px-5 py-2 rounded-lg font-semibold"
              >
                Add Your First Doctor
              </button>
            </div>
          ) : (
            /* Doctor Cards */

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {doctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition"
                >
                  {/* Image */}

                  <div className="h-56 bg-slate-800">
                    {doctor.image ? (
                      <img
                        src={doctor.image}
                        alt={doctor.fullName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Stethoscope size={60} className="text-slate-600" />
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    {/* Doctor Header */}

                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-bold">{doctor.fullName}</h3>

                        <p className="text-cyan-400 mt-1">
                          {doctor.specialization}
                        </p>
                      </div>

                      <span
                        className={`text-xs px-3 py-1 rounded-full border ${
                          doctor.available
                            ? "bg-green-500/10 text-green-400 border-green-500/30"
                            : "bg-red-500/10 text-red-400 border-red-500/30"
                        }`}
                      >
                        {doctor.available ? "Available" : "Unavailable"}
                      </span>
                    </div>

                    {/* Experience */}

                    <p className="text-slate-400 mt-3">
                      {doctor.experience} years experience
                    </p>

                    {/* About */}

                    {doctor.about && (
                      <p className="text-slate-500 text-sm mt-3 line-clamp-3">
                        {doctor.about}
                      </p>
                    )}

                    {/* Actions */}

                    <div className="grid grid-cols-3 gap-2 mt-6">
                      <button
                        onClick={() => openEditDoctor(doctor)}
                        className="flex items-center justify-center gap-1 bg-slate-800 hover:bg-slate-700 py-2 rounded-lg text-sm"
                      >
                        <Pencil size={15} />
                        Edit
                      </button>

                      <button
                        onClick={() => handleToggleAvailability(doctor._id)}
                        className="bg-slate-800 hover:bg-slate-700 py-2 rounded-lg text-sm"
                      >
                        {doctor.available ? "Disable" : "Enable"}
                      </button>

                      <button
                        onClick={() => handleDeleteDoctor(doctor._id)}
                        className="flex items-center justify-center gap-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-2 rounded-lg text-sm"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ======================================
            ADD / EDIT DOCTOR MODAL
        ====================================== */}

        {showDoctorForm && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-5">
            <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}

              <div className="flex items-center justify-between p-6 border-b border-slate-800">
                <div>
                  <h2 className="text-2xl font-bold">
                    {editingDoctor ? "Edit Doctor" : "Add Doctor"}
                  </h2>

                  <p className="text-slate-400 text-sm mt-1">
                    {editingDoctor
                      ? "Update doctor information."
                      : "Add a new doctor to MediFlow."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowDoctorForm(false)}
                  className="p-2 rounded-lg hover:bg-slate-800"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Form */}

              <form onSubmit={handleDoctorSubmit} className="p-6 space-y-5">
                {/* Full Name */}

                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    value={doctorForm.fullName}
                    onChange={handleDoctorChange}
                    placeholder="Dr. Sarah Ahmed"
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Specialization */}

                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Specialization
                  </label>

                  <input
                    type="text"
                    name="specialization"
                    value={doctorForm.specialization}
                    onChange={handleDoctorChange}
                    placeholder="Dentist"
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Experience */}

                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Experience
                  </label>

                  <input
                    type="number"
                    name="experience"
                    value={doctorForm.experience}
                    onChange={handleDoctorChange}
                    placeholder="10"
                    min="0"
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Image URL */}

                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Image URL
                  </label>

                  <input
                    type="url"
                    name="image"
                    value={doctorForm.image}
                    onChange={handleDoctorChange}
                    placeholder="https://example.com/doctor.jpg"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
                  />
                </div>

                {/* About */}

                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    About Doctor
                  </label>

                  <textarea
                    name="about"
                    value={doctorForm.about}
                    onChange={handleDoctorChange}
                    placeholder="Write a short biography..."
                    rows={4}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400 resize-none"
                  />
                </div>

                {/* Availability */}

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={doctorForm.available}
                    onChange={(e) =>
                      setDoctorForm((prev) => ({
                        ...prev,
                        available: e.target.checked,
                      }))
                    }
                    className="w-5 h-5 accent-cyan-500"
                  />

                  <span className="text-slate-300">
                    Doctor is currently available
                  </span>
                </label>

                {/* Buttons */}

                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowDoctorForm(false)}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 py-3 rounded-xl font-semibold"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex-1 bg-cyan-500 hover:bg-cyan-400 py-3 rounded-xl font-semibold"
                  >
                    {editingDoctor ? "Update Doctor" : "Add Doctor"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
