import express from "express";
import { register } from "../controllers/registration_controller.js";
import { upload } from "../configs/cloudinaryStorage.js";

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
