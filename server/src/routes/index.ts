import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.middleware";
import authRoutes from "./auth.route";
import userRoutes from "./user.route";
import workspaceRoutes from "./workspace.route";
import memberRoutes from "./member.route";
import projectRoutes from "./project.route";
import taskRoutes from "./task.route";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", isAuthenticated, userRoutes);
router.use("/workspace", isAuthenticated, workspaceRoutes);
router.use("/member", isAuthenticated, memberRoutes);
router.use("/project", isAuthenticated, projectRoutes);
router.use("/task", isAuthenticated, taskRoutes);

export default router;
