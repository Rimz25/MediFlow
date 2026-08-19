import api from "./api";

export const getAppointments = () => {
  return api.get("/appointments");
};

export const createAppointment = (data: any) => {
  return api.post("/appointments", data);
};

export const cancelAppointment = (id: string) => {
  return api.put(`/appointments/${id}/cancel`);
};

export const rescheduleAppointment = (
  id: string,
  data: {
    appointmentDate: string;
    appointmentTime: string;
  },
) => {
  return api.put(`/appointments/${id}/reschedule`, data);
};
