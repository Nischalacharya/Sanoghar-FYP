import axios from "axios";
const URL = "http://localhost:5000/hostelreview"

export const GetAllHostelReview = () => axios.get(URL)
export const GetHostelReview = (hostel) => axios.post(URL, hostel)
export const AddHostelReview = (hostelreview) => axios.post(URL + "/addhostelreview", hostelreview)