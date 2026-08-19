import api from "./api";

export const getAdminDoctors = () => {
  return api.get("/doctors");
};

export const createDoctor = (data: {
  fullName: string;
  specialization: string;
  experience: number;
  image: string;
  about: string;
  available: boolean;
}) => {
  return api.post("/doctors", data);
};

export const updateDoctor = (
  id: string,
  data: {
    fullName: string;
    specialization: string;
    experience: number;
    image: string;
    about: string;
    available: boolean;
  },
) => {
  return api.put(`/doctors/${id}`, data);
};

export const deleteDoctor = (id: string) => {
  return api.delete(`/doctors/${id}`);
};

export const toggleDoctorAvailability = (id: string) => {
  return api.patch(`/doctors/${id}/availability`);
};
