import express from 'express';
import { GetVerifiedHostel, GetHostel, GetUnverifiedHostel, DeleteHostel, ApproveHostel } from '../controller/Hostel.js';

const router = express.Router();

router.get('/verified', GetVerifiedHostel);
router.post('/', GetHostel);
router.get('/unverified', GetUnverifiedHostel);
router.patch('/:id', ApproveHostel);
router.delete('/:_id', DeleteHostel);
export default router;