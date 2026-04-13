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

export const upload = multer({ storage });
