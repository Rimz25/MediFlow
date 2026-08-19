import express from "express";

import {
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  toggleDoctorAvailability,
} from "../controllers/doctorController.js";

import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

// Get all doctors
router.get("/", getDoctors);

// Get one doctor
router.get("/:id", getDoctor);

// Admin: create doctor
router.post("/", protect, adminOnly, createDoctor);

// Admin: update doctor
router.put("/:id", protect, adminOnly, updateDoctor);

// Admin: delete doctor
router.delete("/:id", protect, adminOnly, deleteDoctor);

// Admin: enable/disable doctor
router.patch("/:id/availability", protect, adminOnly, toggleDoctorAvailability);

export default router;
