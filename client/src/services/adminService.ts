import api from "./api";

// Get admin dashboard statistics
export const getAdminStats = () => {
  return api.get("/admin/stats");
};

// Get all appointments
export const getAllAppointments = () => {
  return api.get("/admin/appointments");
};

// Update appointment status
export const updateAppointmentStatus = (id: string, status: string) => {
  return api.put(`/appointments/${id}/status`, {
    status,
  });
};
