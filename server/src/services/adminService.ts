import api from "./api";

export const getAdminStats = () => {
  return api.get("/admin/stats");
};

export const getAllAppointments = () => {
  return api.get("/admin/appointments");
};

export const updateAppointmentStatus = (id: string, status: string) => {
  return api.put(`/appointments/${id}/status`, {
    status,
  });
};
