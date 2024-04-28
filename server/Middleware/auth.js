import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.access_token;

        if (!token) {
            return res.status(401).json({ message: "User is not authenticated" });
        }

        try {

            jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
                if (err) return next(errorHandler(403, 'Token is not valid!'));

                req.user = user;
                next();
            });
        } catch (error) {
            res.status(401).json({ message: error.message })
        }



    } catch (error) {
        res.status(401).json({ message: error.message })
    }
} 