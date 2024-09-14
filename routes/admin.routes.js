import express from "express";
import {
  adminLogin,
  adminLogout,
  allChats,
  allMessages,
  allUsers,
  getAdminData,
  getDashboardStats,
} from "../controllers/admin.controller.js";
import { adminLoginValidator, validateHandler } from "../lib/validators.js";
import { adminOnly } from "../middlewares/auth.js";

const router = express.Router();

router.post("/verify", adminLoginValidator(), validateHandler, adminLogin);

router.get("/logout", adminLogout);

// Only Admin Can Accecss these Routes

router.use(adminOnly);

router.get("/", getAdminData);

router.get("/users", allUsers);
router.get("/chats", allChats);
router.get("/messages", allMessages);

router.get("/stats", getDashboardStats);

export default router;
