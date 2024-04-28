import axios from "axios";
const URL = `${import.meta.env.VITE_BE_URL}/payment`;

const header = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  credentials: "include",
};

export const GetPayment = () => axios.get(URL, header);
export const CreatePayment = (payment) => axios.post(URL, payment, header);
export const GetPaymentByHostel = (hostel) =>
  axios.post(`${URL}/hostel`, hostel, header);
export const VerifyPayment = (payment) =>
  axios.post(`${URL}/verify`, payment, header);
