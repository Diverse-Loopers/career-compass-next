import express from "express";
import {
  sendEmailOtp,
  verifyEmailOtp,
} from "../controllers/email_otp_controller.js";

const otp_router = express.Router();

otp_router.post("/send-otp", sendEmailOtp);

otp_router.post("/verify-otp", verifyEmailOtp);

// router.get("/register", testPrisma);

export default otp_router;
