import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createAppointment,
  getAppointments,
  cancelAppointment,
  rescheduleAppointment,
  updateAppointmentStatus,
} from "../controllers/appointmentController.js";

const router = express.Router();

// Create appointment
router.post("/", protect, createAppointment);

// Get logged-in patient's appointments
router.get("/", protect, getAppointments);

// Cancel appointment
router.put("/:id/cancel", protect, cancelAppointment);

// Reschedule appointment
router.put("/:id/reschedule", protect, rescheduleAppointment);

// Update appointment status
router.put("/:id/status", protect, updateAppointmentStatus);

export default router;
