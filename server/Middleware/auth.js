import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        req.user = decoded;

        next();

    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}