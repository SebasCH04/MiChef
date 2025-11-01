import { Router } from "express";
import { loginController } from "../Controllers/login.Controller.js";

const router = Router();

// Autenticación
router.post("/login", loginController.login);
router.post("/register", loginController.register);
router.post("/recover-password", loginController.recoverPassword);



export default router;