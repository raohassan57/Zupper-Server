import express from "express";
import {
  addMembers,
  deleteChat,
  getChatDetails,
  getMessages,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMember,
  renameGroup,
  sendAttachments,
} from "../controllers/chat.controller.js";
import {
  addMemberValidator,
  chatIdValidator,
  newGroupValidator,
  removeMemberValidator,
  renameValidator,
  sendAttachmentsValidator,
  validateHandler,
} from "../lib/validators.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { attachmentsMulter } from "../middlewares/multer.js";

const router = express.Router();

// After here user must be logged in to access the routes

router.use(isAuthenticated);

router.post("/new", newGroupValidator(), validateHandler, newGroupChat);

router.get("/my", getMyChats);

router.get("/my/groups", getMyGroups);

router.put("/addmembers", addMemberValidator(), validateHandler, addMembers);

router.put(
  "/removemember",
  removeMemberValidator(),
  validateHandler,
  removeMember
);

router.delete("/leave/:id", chatIdValidator(), validateHandler, leaveGroup);

// Send Attachments
router.post(
  "/message",
  attachmentsMulter,
  sendAttachmentsValidator(),
  validateHandler,
  sendAttachments
);

// Get Messages
router.get("/message/:id", chatIdValidator(), validateHandler, getMessages);

// Get Chat Details, rename,delete
router
  .route("/:id")
  .get(chatIdValidator(), validateHandler, getChatDetails)
  .put(renameValidator(), validateHandler, renameGroup)
  .delete(chatIdValidator(), validateHandler, deleteChat);

export default router;
