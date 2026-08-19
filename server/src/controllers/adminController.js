import User from "../models/User.js";
import Doctor from "../models/Doctor.js";
import Appointment from "../models/Appointment.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalPatients = await User.countDocuments({
      role: "patient",
    });

    const totalDoctors = await Doctor.countDocuments();

    const totalAppointments = await Appointment.countDocuments();

    const completedAppointments = await Appointment.countDocuments({
      status: "Completed",
    });

    const pendingAppointments = await Appointment.countDocuments({
      status: "Pending",
    });

    const confirmedAppointments = await Appointment.countDocuments({
      status: "Confirmed",
    });

    const cancelledAppointments = await Appointment.countDocuments({
      status: "Cancelled",
    });

    res.json({
      success: true,
      stats: {
        totalPatients,
        totalDoctors,
        totalAppointments,
        completedAppointments,
        pendingAppointments,
        confirmedAppointments,
        cancelledAppointments,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "fullName email phone")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
