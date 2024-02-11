import { Router } from "express";
import { GetHostelReview, GetAllHostelReview, AddHostelReview } from "../controller/HostelReview.js";

const router = Router();

router.get("/", GetAllHostelReview);
router.post("/", GetHostelReview);
router.post("/addhostelreview", AddHostelReview);

export default router;