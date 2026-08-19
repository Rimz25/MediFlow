import api from "./api";

export const getDoctors = () => {
  return api.get("/doctors");
};
