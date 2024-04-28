import axios from "axios";
// const URL = "http://192.168.11.2:5000/hostelreview";
const URL = `${import.meta.env.VITE_BE_URL}/hostelreview`;

const header = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  credentials: "include",
};

export const GetAllHostelReview = () => axios.get(URL);
export const GetHostelReview = (hostel) => axios.post(URL, hostel);
export const AddHostelReview = (hostelreview) =>
  axios.post(URL + "/addhostelreview", hostelreview, header);
