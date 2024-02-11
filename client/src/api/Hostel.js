import axios from "axios";
const URL = "http://localhost:5000/hostel"

export const GetVerifiedHostel = () => axios.get(URL + "/verified");
export const GetUnverifiedHostel = () => axios.get(URL + "/unverified");
export const AddHostel = (hostel) => axios.post(`${URL}/addhostel`, hostel);
export const ApproveHostel = (hostel) => axios.patch(`${URL}/${hostel._id}`, hostel);
export const DeleteHostel = (_id) => axios.delete(`${URL}/${_id}`);
export const GetHostel = (email) => axios.post(URL, email)