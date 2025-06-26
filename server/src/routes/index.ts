import express from "express";
// import isAuthenticated from "../middlewares/isAuthenticated.middleware";
import authRoutes from "./auth.route";
import userRoutes from "./user.route";
import workspaceRoutes from "./workspace.route";
import memberRoutes from "./member.route";
import projectRoutes from "./project.route";
import taskRoutes from "./task.route";
import { passportAuthenticateJWT } from "../config/passport.config";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", passportAuthenticateJWT, userRoutes);
router.use("/workspace", passportAuthenticateJWT, workspaceRoutes);
router.use("/member", passportAuthenticateJWT, memberRoutes);
router.use("/project", passportAuthenticateJWT, projectRoutes);
router.use("/task", passportAuthenticateJWT, taskRoutes);

export default router;
