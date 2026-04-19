import bcrypt from "bcrypt";
import { prisma } from "../../../shared/prisma.js";
import crypto from "crypto";
import {
  generateEmployeeId,
  generateFingerprint,
  mapIdType,
  normalizeIdentifier,
} from "../../../shared/services.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

const SALT_ROUNDS = 10;
const MAX_RETRIES = 3;

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing");
}

export const register = async (req, res) => {
  const uploadedPublicIds = [];

  try {
    const data = req.body;
    const files = req.files;

    const eduFile = files?.eduFile?.[0];
    const idFile = files?.idFile?.[0];

    if (eduFile?.filename) uploadedPublicIds.push(eduFile.filename);
    if (idFile?.filename) uploadedPublicIds.push(idFile.filename);

    const requiredFields = [
      "full_name",
      "email",
      "mobile",
      "password",
      "government_id_number",
      "date_of_birth",
    ];

    const errors = {};
    for (const field of requiredFields) {
      if (!data[field]) errors[field] = `${field} is required`;
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const email = data.email.trim().toLowerCase();
    const full_name = data.full_name.trim();

    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    const identity_fingerprint = generateFingerprint(
      data.government_id_number,
      data.date_of_birth,
    );

    const entity_id = "REG-" + crypto.randomUUID();

    const eduFileUrl = eduFile?.path || eduFile?.secure_url || null;
    const idFileUrl = idFile?.path || idFile?.secure_url || null;

    let candidate = null;

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        candidate = await prisma.identity.candidate.create({
          data: {
            employee_id: generateEmployeeId(),

            entity_id,
            full_name,
            email,
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

        break;
      } catch (err) {
        if (
          err.code === "P2002" &&
          err.meta?.target?.includes("employee_id") &&
          attempt < MAX_RETRIES - 1
        ) {
          continue;
        }

        throw err;
      }
    }
    if (!candidate) {
      throw new Error("Failed to generate unique employee ID");
    }

    const { password_hash, ...safeData } = candidate;

    return res.status(201).json({
      success: true,
      message: "Candidate registered successfully",
      data: safeData,
    });
  } catch (err) {
    console.error("❌ REGISTER ERROR:", err);

    if (uploadedPublicIds.length > 0) {
      await Promise.all(
        uploadedPublicIds.map((id) =>
          cloudinary.uploader.destroy(id).catch(() => {}),
        ),
      );
    }

    if (err.status === 400) {
      return res.status(400).json({
        success: false,
        errors: err.errors,
      });
    }

    if (err.code === "P2002") {
      const target = err.meta?.target || [];

      const fieldErrors = {};
      if (target.includes("email")) fieldErrors.email = "Email already exists";
      if (target.includes("mobile"))
        fieldErrors.mobile = "Mobile already exists";
      if (target.includes("identity_fingerprint"))
        fieldErrors.identity = "User already exists";

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

// ---------------- LOGIN ----------------

export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        error: "Identifier and password are required",
      });
    }

    const where = normalizeIdentifier(identifier);

    const candidate = await prisma.identity.candidate.findUnique({
      where,
    });

    if (!candidate) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    if (!candidate.is_active) {
      return res.status(403).json({
        success: false,
        error: "Account inactive",
      });
    }

    const isMatch = await bcrypt.compare(password, candidate.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: candidate.id,
        employee_id: candidate.employee_id,
        email: candidate.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    const { password_hash, ...safeUser } = candidate;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: safeUser,
    });
  } catch (err) {
    console.error("❌ LOGIN ERROR:", err);

    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
