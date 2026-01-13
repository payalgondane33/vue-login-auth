import { api } from "./api";

export const loginApi = async (payload) => {
  // payload = { email, password }
  const response = await api.post("/auth/login", payload);
  return response.data; // { token: "...." }
};
