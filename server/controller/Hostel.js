import Hostel from "../model/Hostel.js";
import mongoose from "mongoose";

export const GetUnverifiedHostel = async (req, res) => {
    try {
        const hostel = await Hostel.find({ isApprove: "Pending" })
        res.status(200).json(hostel)
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}

export const GetVerifiedHostel = async (req, res) => {
    try {
        const hostel = await Hostel.find({ isApprove: "Approved" })
        res.status(200).json(hostel)
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}

export const GetHostel = async (req, res) => {
    const { email } = req.body;
    try {
        const hostel = await Hostel.find({ email })
        res.status(200).json(hostel)
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}

export const AddHostel = async (req, res) => {
    const latlng = JSON.parse(req.body.latlng) || ""
    const { title, description, room, price, location, sex, imagepath1, imagepath2, imagepath3, email } = req.body
    try {
        let hostel = await Hostel.findOne({ title: title })

        if (hostel) { return res.status(200).json({ message: "hostel already added" }) }

        const newHostel = new Hostel({
            title, description, room, price, location, sex, imagepath1, imagepath2, imagepath3, latlng, email
        })

        await newHostel.save()

        res.status(201).json({ message: "New hostel added", success: true })

    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}

export const ApproveHostel = async (req, res) => {
    try {
        const _id = req.params.id;
        const { isApprove } = req.body;

        const hostel = await Hostel.findOne({ _id });

        if (!hostel) {
            return res.status(404).json({ message: 'hostel not found' });
        }

        const updatedHostel = await Hostel.findByIdAndUpdate(
            _id,
            { isApprove },
        );
        res.status(200).json({ message: 'hostel updated sucessfully', success: true, hostel: updatedHostel })
    } catch (error) {
        console.error('error updating hostel', error);
        res.status(500).json({ message: 'Error updating hostel', success: false, error: error.message })
    }
}

export const DeleteHostel = async (req, res) => {
    try {
        const { _id } = req.params;

        await Hostel.findOneAndDelete({ _id });

        res.status(200).json({ message: 'hostel deleted sucessfully' });
    } catch (error) {
        console.error('error deleting hostel', error);
        res.status(500).json({ message: 'error deleting hostel', error: error.message })
    }
}