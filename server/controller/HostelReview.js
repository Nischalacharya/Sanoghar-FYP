import HostelReview from "../model/HostelReview.js";

export const GetHostelReview = async (req, res) => {
    const { hostel } = req.body
    try {
        const review = await HostelReview.find({ hostel })
        res.status(200).json(review)
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}

export const GetAllHostelReview = async (req, res) => {
    try {
        const review = await HostelReview.find();
        res.status(200).json(review)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const AddHostelReview = async (req, res) => {
    const { username, hostel, review, rating } = req.body;
    try {
        const newReview = new HostelReview({
            username,
            hostel,
            review,
            rating
        })
        await newReview.save()
        res.status(201).json({ message: "review added", success: true })
    } catch (error) {
        res.status(409).json({ message: error.message, success: false })
    }
}