import Doctor from "../models/Doctor.js";

// GET ALL DOCTORS
export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE DOCTOR
export const getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.json({
      success: true,
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE DOCTOR
export const createDoctor = async (req, res) => {
  try {
    const { fullName, specialization, experience, image, about, available } =
      req.body;

    if (!fullName || !specialization || experience === undefined) {
      return res.status(400).json({
        success: false,
        message: "Full name, specialization and experience are required",
      });
    }

    const doctor = await Doctor.create({
      fullName,
      specialization,
      experience,
      image: image || "",
      about: about || "",
      available: available !== undefined ? available : true,
    });

    res.status(201).json({
      success: true,
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE DOCTOR
export const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const { fullName, specialization, experience, image, about, available } =
      req.body;

    doctor.fullName = fullName !== undefined ? fullName : doctor.fullName;

    doctor.specialization =
      specialization !== undefined ? specialization : doctor.specialization;

    doctor.experience =
      experience !== undefined ? experience : doctor.experience;

    doctor.image = image !== undefined ? image : doctor.image;

    doctor.about = about !== undefined ? about : doctor.about;

    doctor.available = available !== undefined ? available : doctor.available;

    await doctor.save();

    res.json({
      success: true,
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE DOCTOR
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    await doctor.deleteOne();

    res.json({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// TOGGLE DOCTOR AVAILABILITY
export const toggleDoctorAvailability = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    doctor.available = !doctor.available;

    await doctor.save();

    res.json({
      success: true,
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
