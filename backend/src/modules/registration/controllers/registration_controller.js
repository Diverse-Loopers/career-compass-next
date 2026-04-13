import bcrypt from "bcrypt";
import { prisma } from "../../../shared/prisma.js";
import crypto from "crypto";
import {
  generateEmployeeId,
  generateFingerprint,
} from "../../../shared/services.js";

export const register = async (req, res) => {
  try {
    const data = req.body;
    const files = req.files;

    const eduFile = files?.eduFile?.[0];
    const idFile = files?.idFile?.[0];

    console.log("\n📥 ===== NEW REGISTRATION =====");
    console.log("🧾 Body:", data);
    console.log("📁 Files:", files);
    console.log("================================\n");

    const errors = {};

    if (!data.full_name) errors.full_name = "Full name is required";
    if (!data.email) errors.email = "Email is required";
    if (!data.mobile) errors.mobile = "Mobile is required";
    if (!data.password) errors.password = "Password is required";
    if (!data.government_id_number)
      errors.government_id_number = "ID number is required";
    if (!data.date_of_birth) errors.date_of_birth = "Date of birth is required";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const eduFileUrl = eduFile ? eduFile.path : null;
    const idFileUrl = idFile ? idFile.path : null;

    const hashedPassword = await bcrypt.hash(data.password, 10);

    let employee_id;
    let exists = true;

    while (exists) {
      employee_id = generateEmployeeId();

      const existing = await prisma.identity.candidate.findUnique({
        where: { employee_id },
      });

      if (!existing) exists = false;
    }

    const entity_id = "REG-" + crypto.randomUUID();

    const identity_fingerprint = generateFingerprint(
      data.government_id_number,
      data.date_of_birth,
    );

    const existingFingerprint = await prisma.identity.candidate.findUnique({
      where: { identity_fingerprint },
    });

    if (existingFingerprint) {
      return res.status(409).json({
        success: false,
        error: "User with same identity already exists",
      });
    }

    const mapIdType = (type) => {
      switch (type) {
        case "aadhaar":
        case "Aadhaar":
          return "Aadhaar";
        case "pan":
        case "PAN":
          return "PAN";
        case "passport":
          return "Passport";
        case "driving":
        case "Driving_License":
          return "Driving_License";
        default:
          return "Aadhaar";
      }
    };

    const candidate = await prisma.identity.candidate.create({
      data: {
        employee_id,
        entity_id,

        full_name: data.full_name,
        email: data.email,
        mobile: data.mobile,

        government_id_type: mapIdType(data.government_id_type),
        government_id_number: data.government_id_number,
        government_id_image_url: idFileUrl,

        identity_fingerprint,

        password_hash: hashedPassword,

        date_of_birth: new Date(data.date_of_birth),

        education: data.education,
        education_roll_no: data.education_roll_no,
        education_image_url: eduFileUrl,

        is_active: true,
      },
    });

    const { password_hash, ...safeData } = candidate;

    return res.status(201).json({
      success: true,
      message: "Candidate registered successfully",
      data: safeData,
    });
  } catch (err) {
    console.error("❌ ERROR:", err);

    if (err.code === "P2002") {
      const target = err.meta?.target || [];

      const fieldErrors = {};

      if (target.includes("email")) {
        fieldErrors.email = "Email already exists";
      }
      if (target.includes("mobile")) {
        fieldErrors.mobile = "Mobile already exists";
      }
      if (target.includes("identity_fingerprint")) {
        fieldErrors.identity = "User with same identity already exists";
      }

      return res.status(409).json({
        success: false,
        errors: fieldErrors,
      });
    }

    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
