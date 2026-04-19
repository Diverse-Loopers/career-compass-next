import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../configs/cloudinary.js";
import path from "path";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "career-compass",
    resource_type: "auto",
    public_id: Date.now() + "-" + path.parse(file.originalname).name,
  }),
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "application/pdf"];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
