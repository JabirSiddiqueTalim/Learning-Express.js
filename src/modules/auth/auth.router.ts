import { Router } from "express";
import { authController } from "./auth.controller";

const router=Router();

router.post('/login',authController.loginController);
router.post('/refresh-token',authController.refreshTokenController)

export const loginRouter=router;
