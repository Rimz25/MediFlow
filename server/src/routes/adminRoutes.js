import express from "express";

import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

import {
  getAdminStats,
  getAllAppointments,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/stats", protect, adminOnly, getAdminStats);

router.get("/appointments", protect, adminOnly, getAllAppointments);

export default router;
