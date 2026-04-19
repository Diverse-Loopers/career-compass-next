import { redisClient } from "../../../shared/redis.js";
import { generateOtp } from "../../../shared/services.js";
import { transporter } from "../configs/smtp.js";
import { prisma } from "../../../shared/prisma.js";
import { log } from "console";

export const sendEmailOtp = async (req, res) => {
  try {
    const { email, mobile } = req.body;

    if (!email || !mobile) {
      return res.status(400).json({
        success: false,
        message: "Email and Mobile are required",
      });
    }

    if (!email.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Invalid mobile number",
      });
    }

    const existingUser = await prisma.identity.candidate.findFirst({
      where: {
        OR: [{ email }, { mobile }],
      },
    });

    if (existingUser) {
      const emailExists = existingUser.email === email;
      const mobileExists = existingUser.mobile === mobile;

      let message = "User already exists";

      if (emailExists && mobileExists) {
        message = "Email and mobile number already registered";
      } else if (emailExists) {
        message = "Email already registered";
      } else if (mobileExists) {
        message = "Mobile number already registered";
      }

      return res.status(409).json({
        success: false,
        message,
        errors: {
          email: emailExists,
          mobile: mobileExists,
        },
      });
    }

    const otp = generateOtp();

    await redisClient.set(`otp:${email}`, JSON.stringify({ otp, mobile }), {
      EX: 300,
    });

    console.log(otp);

    await transporter.sendMail({
      from: `"SkillVerify" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      html: `
        <h2>Email Verification</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      `,
    });
    console.log(otp);
    return res.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};
export const verifyEmailOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const storedOtp = await redisClient.get(`otp:${email}`);

    if (!storedOtp) {
      return res.status(400).json({
        success: false,
        message: "OTP expired or not found",
      });
    }

    // ✅ STEP 1: parse JSON
    const parsed = JSON.parse(storedOtp);

    // ✅ STEP 2: extract OTP
    const savedOtp = parsed.otp;

    // ✅ STEP 3: compare safely
    if (String(savedOtp) !== String(otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    await redisClient.del(`otp:${email}`);

    return res.json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Verification failed",
    });
  }
};
