import express from "express";
import { testDB, testPrisma } from "../controllers/db_test_controller.js";

const router = express.Router();

router.get("/test-db", testDB);

router.get("/test-prisma", testPrisma);

export default router;
