import multer from "multer";
import path from "path";
import fs from "fs";

// ✅ Ensure uploads folder exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // keep extension
    const uniqueName = Date.now() + ext;
    cb(null, uniqueName);
  },
});

// ✅ Multer instance
const upload = multer({
  storage,

  // 🔒 Optional but recommended: file size limit (e.g., 5MB)
  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  // 🔒 Optional: file type validation
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedTypes.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, PNG, and PDF files are allowed"));
    }
  },
});

export default upload;
