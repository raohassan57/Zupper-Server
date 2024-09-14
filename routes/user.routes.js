import express from "express";
import {
  acceptFriendRequest,
  getMyFriends,
  getMyNotifications,
  getMyProfile,
  login,
  logout,
  newUser,
  searchUser,
  sendFriendRequest,
  googleLogin
} from "../controllers/user.controller.js";
import {
  acceptRequestValidator,
  loginValidator,
  registerValidator,
  sendRequestValidator,
  validateHandler,
} from "../lib/validators.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { singleAvatar } from "../middlewares/multer.js";

const router = express.Router();

router.post("/new", singleAvatar, registerValidator(), validateHandler, newUser);
router.post("/login", loginValidator(), validateHandler, login);
router.post("/Googlelogin",  googleLogin);

// After here user must be logged in to access the routes

router.use(isAuthenticated);

router.get("/me", getMyProfile);

router.get("/logout", logout);

router.get("/search", searchUser);

router.put(
  "/sendrequest",
  sendRequestValidator(),
  validateHandler,
  sendFriendRequest
);

router.put(
  "/acceptrequest",
  acceptRequestValidator(),
  validateHandler,
  acceptFriendRequest
);

router.get("/notifications", getMyNotifications);

router.get("/friends", getMyFriends);

export default router;