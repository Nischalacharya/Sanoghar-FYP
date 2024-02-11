import axios from "axios";
const URL = "http://localhost:5000/user"

export const GetUser = () => axios.get(URL);
export const SignupUser = (user) => axios.post(`${URL}/signup`, user);
export const LoginUser = (user) => axios.post(`${URL}/login`, user);
export const ForgotPassword = (user) => axios.post(`${URL}/forgotPassword`, user);
export const ResetPassword = (user) => axios.post(`${URL}/resetPassword`, user)
export const editUser = (user) => axios.patch(`${URL}/${user.id}`, user);
export const deleteUser = (id) => axios.delete(`${URL}/${id}`)