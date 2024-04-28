import { Router } from "express";
import { GetHostelReview, GetAllHostelReview, AddHostelReview } from "../controller/HostelReview.js";
import { verifyToken } from "../Middleware/auth.js";

const router = Router();

router.get("/", GetAllHostelReview);
router.post("/", GetHostelReview);
router.post("/addhostelreview", verifyToken, AddHostelReview);

export default router;