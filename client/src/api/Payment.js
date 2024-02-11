import axios from "axios";
const URL = "http://localhost:5000/payment"

export const GetPayment = () => axios.get(URL)
export const CreatePayment = (payment) => axios.post(URL, payment)
export const GetPaymentByHostel = (hostel) => axios.post(`${URL}/hostel`, hostel)
export const VerifyPayment = (payment) => axios.post(`${URL}/verify`, payment)