import { ObjectId } from "mongodb";
import Hostel from "../model/Hostel.js";
import HostelReview from "../model/HostelReview.js";

export const GetUnverifiedHostel = async (req, res) => {
  try {
    const hostel = await Hostel.find({ isApprove: "Pending" });
    res.status(200).json(hostel);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const GetVerifiedHostel = async (req, res) => {
  try {
    const hostel = await Hostel.find({ isApprove: "Approved" });
    res.status(200).json(hostel);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const GetAllHostel = async (req, res) => {
  try {
    const hostel = await Hostel.find();
    res.status(200).json(hostel);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

export const GetHostel = async (req, res) => {
  const { email } = req.body;
  try {
    const hostel = await Hostel.find({ email: { $in: [email] } });
    res.status(200).json(hostel);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const AddHostel = async (req, res) => {
  const latlng = JSON.parse(req.body.latlng) || "";
  const floor = JSON.parse(req.body.floor) || "";
  const {
    _id,
    title,
    description,
    location,
    sex,
    imagepath1,
    imagepath2,
    imagepath3,
    email,
  } = req.body;
  try {
    if (_id) {
      let hostel = await Hostel.findOne({ _id });

      if (hostel) {
        const updatedHostel = await Hostel.findByIdAndUpdate(hostel._id, {
          title,
          description,
          location,
          sex,
          imagepath1,
          imagepath2,
          imagepath3,
          email,
          latlng,
          floor,
        });
        return res
          .status(200)
          .json({
            message: "hostel updated sucessfully",
            success: true,
            hostel: updatedHostel,
          });
      }
    }

    const newHostel = new Hostel({
      title,
      description,
      location,
      sex,
      imagepath1,
      imagepath2,
      imagepath3,
      latlng,
      email,
      floor,
    });

    await newHostel.save();

    res.status(201).json({ message: "New hostel added", success: true });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const ApproveHostel = async (req, res) => {
  try {
    const _id = req.params.id;
    const { isApprove } = req.body;

    const hostel = await Hostel.findOne({ _id });

    if (!hostel) {
      return res.status(404).json({ message: "hostel not found" });
    }

    const updatedHostel = await Hostel.findByIdAndUpdate(_id, { isApprove });
    res
      .status(200)
      .json({
        message: "hostel updated sucessfully",
        success: true,
        hostel: updatedHostel,
      });
  } catch (error) {
    console.error("error updating hostel", error);
    res
      .status(500)
      .json({
        message: "Error updating hostel",
        success: false,
        error: error.message,
      });
  }
};

export const DeleteHostel = async (req, res) => {
  try {
    const { _id } = req.params;

    await Hostel.findOneAndDelete({ _id });

    res.status(200).json({ message: "hostel deleted sucessfully" });
  } catch (error) {
    console.error("error deleting hostel", error);
    res
      .status(500)
      .json({ message: "error deleting hostel", error: error.message });
  }
};

export const FilterHostel = async (req, res) => {
  const { price, bed, rating, sex } = req.body;
  try {
    const query = {
      isApprove: "Approved",
    };

    if (price) {
      query.price = { $lte: price };
    }

    if (bed) {
      query.bed = bed;
    }

    if (sex) {
      query.sex = sex;
    }

    let matchingReviews = [];
    if (rating) {
      matchingReviews = await HostelReview.find({ rating: { $gte: rating } });
    }

    const hostelIdsWithMatchingReviews = matchingReviews.map(
      (review) => review.hostel
    );

    const filteredHostels = rating
      ? await Hostel.find({
        title: { $in: hostelIdsWithMatchingReviews },
        ...query,
      })
      : await Hostel.find(query);

    res.status(200).json(filteredHostels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
