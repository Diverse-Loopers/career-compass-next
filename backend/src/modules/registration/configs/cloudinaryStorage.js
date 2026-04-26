// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../configs/cloudinary.js";
// import path from "path";

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => ({
//     folder: "career-compass",
//     resource_type: "auto",

//     public_id: Date.now() + "-" + path.parse(file.originalname).name,
//   }),
// });

// export const upload = multer({ storage });

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../configs/cloudinary.js";
import path from "path";

const storage = new CloudinaryStorage({
  cloudinary,
  // params: async (req, file) => ({
  //   folder: "career-compass",
  //   resource_type: "auto",

  //   public_id: Date.now() + "-" + path.parse(file.originalname).name,
  // }),
    params: async (req, file) => {
    // ✅ reconfigure at request time — env vars are guaranteed set by now
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    return {
      folder: "career-compass",
      resource_type: "auto",
      public_id: Date.now() + "-" + path.parse(file.originalname).name,
    };
  },
});

export const upload = multer({ storage });
