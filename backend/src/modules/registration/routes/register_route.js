import express from "express";
import { register } from "../controllers/registration_controller.js";
import upload from "../middleware/upload.js"; // ✅ FIX: import multer config

const register_router = express.Router();

register_router.post(
  "/register",
  upload.fields([
    { name: "eduFile", maxCount: 1 },
    { name: "idFile", maxCount: 1 },
  ]),
  register,
);

export default register_router;
