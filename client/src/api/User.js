import axios from "axios";
// const URL = "http://192.168.11.2:5000/user";
const URL = `${import.meta.env.VITE_BE_URL}/user`;

const header = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  credentials: "include",
};

export const GetUser = () => axios.get(URL);
export const SignupUser = (user) => axios.post(`${URL}/signup`, user, header);
export const LoginUser = (user) => axios.post(`${URL}/login`, user, header);
export const ForgotPassword = (user) =>
  axios.post(`${URL}/forgotPassword`, user);
export const ResetPassword = (user) =>
  axios.post(`${URL}/resetPassword`, user, header);
export const editUser = (user) =>
  axios.patch(`${URL}/${user._id}`, user, header);
export const deleteUser = (id) => axios.delete(`${URL}/${id}`, header);
export const logoutUser = () => axios.get(`${URL}/logout`, header);
