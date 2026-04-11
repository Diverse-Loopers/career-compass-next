import express from "express";
import cors from "cors";
import "dotenv/config";
import multer from "multer";
import path from "path";
import db_router from "../registration/routes/db_test_route.js";
import { connectRedis } from "../../shared/redis.js";
import { checkAllDBConnections } from "../../shared/db.js";
import otp_router from "./routes/email_route.js";
import register_router from "./routes/register_route.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// ── Health route ────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is running 🚀",
  });
});

app.use("/api/db", db_router);
app.use("/api/email", otp_router);
app.use("/api", register_router);

// ── Start server ────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.clear();

  console.log("🚀 Starting Server...\n");

  await connectRedis();
  await checkAllDBConnections();

  console.log("🎉 All services are up and running!");
  console.log(`🌐 Server running on port ${PORT}\n`);
});

// ── Error handling ──────────────────────────────────
process.on("uncaughtException", (err) => {
  console.error("💥 Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("💥 Unhandled Rejection:", err);
});
