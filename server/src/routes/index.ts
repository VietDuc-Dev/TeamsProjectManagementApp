import express from "express";
import authRoutes from "./auth.route";
import userRoutes from "./user.route";
import isAuthenticated from "../middlewares/isAuthenticated.middleware";
import workspaceRoutes from "./workspace.route";
import memberRoutes from "./member.routes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", isAuthenticated, userRoutes);
router.use("/workspace", isAuthenticated, workspaceRoutes);
router.use("/member", isAuthenticated, memberRoutes);

export default router;
