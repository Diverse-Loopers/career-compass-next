import express from "express";
import { login, register } from "../controllers/registration_controller.js";
import { upload } from "../configs/cloudinaryStorage.js";
import { loginLimiter, registerLimiter } from "../configs/rate_limiter.js";

const register_router = express.Router();

const uploadMiddleware = (req, res, next) => {
  upload.fields([
    { name: "eduFile", maxCount: 1 },
    { name: "idFile", maxCount: 1 },
  ])(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err.message,
      });
    }
    next();
  });
};

register_router.post("/register", registerLimiter, uploadMiddleware, register);
register_router.post("/login", loginLimiter, login);

export default register_router;
