import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { config } from "../config/app.config";
import { registerSchema } from "../validation/auth.validation";
import { HTTPSTATUS } from "../config/http.config";
import { registerUserService } from "../services/auth.service";
import passport from "passport";
import { signJwtToken } from "../utils/jwt";

// [GET] LOGIN WITH GG
export const googleLoginCallback = asyncHandler(
  async (req: Request, res: Response) => {
    const jwt = req.jwt;
    const currentWorkspace = req.user?.currentWorkspace;

    if (!jwt) {
      return res.redirect(
        `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`
      );
    }

    // return res.redirect(
    //   `${config.FRONTEND_ORIGIN}/workspace/${currentWorkspace}`
    // );

    return res.redirect(
      `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=success&access_token=${jwt}&current_workspace=${currentWorkspace}`
    );
  }
);

// [POST] REGISTER USER ACCOUNT
export const registerUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = registerSchema.parse({
      ...req.body,
    });

    await registerUserService(body);

    return res.status(HTTPSTATUS.CREATED).json({
      message: "User created successfully",
    });
  }
);

// [POST] LOGIN USER
export const loginController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "local",
      (
        err: Error | null,
        user: Express.User | false,
        info: { message: string } | undefined
      ) => {
        if (err) {
          return next(err);
        }

        if (!user) {
          return res.status(HTTPSTATUS.UNAUTHORRIZED).json({
            message: info?.message || "Invalid email or password",
          });
        }

        // req.logIn(user, (err) => {
        //   if (err) {
        //     return next(err);
        //   }

        //   return res.status(HTTPSTATUS.OK).json({
        //     message: "Login in successfully",
        //     user: user.omitPassword(),
        //   });
        // });

        const access_token = signJwtToken({ userId: user._id });

        return res.status(HTTPSTATUS.OK).json({
          message: "Logged in successfully",
          access_token,
          user: user.omitPassword(),
        });
      }
    )(req, res, next);
  }
);

// [POST] LOGOUT USER
export const logOutController = asyncHandler(
  async (req: Request, res: Response) => {
    // await new Promise<void>((resolve, reject) => {
    //   req.logout((err) => {
    //     if (err) {
    //       console.error("Logout error:", err);
    //       return res
    //         .status(HTTPSTATUS.INTERNAL_SERVER_ERROR)
    //         .json({ error: "Failed to log out" });
    //     }
    //     resolve();
    //   });
    // });

    // await new Promise<void>((resolve, reject) => {
    //   req.session.destroy((err) => {
    //     if (err) {
    //       console.error("Session destroy error:", err);
    //       return res
    //         .status(HTTPSTATUS.INTERNAL_SERVER_ERROR)
    //         .json({ error: "Could not destroy session" });
    //     }
    //     res.clearCookie("session");
    //     resolve();
    //   });
    // });

    return res
      .status(HTTPSTATUS.OK)
      .json({ message: "Logged out successfully" });
  }
);
