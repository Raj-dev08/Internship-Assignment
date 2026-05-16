import express from "express";

import {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
  beAdmin,
  cancelAdmin,
} from "../controller/auth.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put(
  "/update-profile",
  protectRoute,
  updateProfile
);

router.get(
  "/check",
  protectRoute,
  checkAuth
);

router.patch(
  "/be-admin",
  protectRoute,
  beAdmin
);

router.patch(
  "/cancel-admin",
  protectRoute,
  cancelAdmin
);

export default router;