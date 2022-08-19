import { Router } from "express";
import loginRoutes from "./loginRoutes";
import signupRoutes from "./signupRoutes";
import contactRoutes from "./contactRoutes";
import { authorize } from "../middlewares/authorize";

const router = Router();

router.use("/login", loginRoutes);
router.use("/signup", signupRoutes);
router.use(authorize); //middleware checks if the user is authorized or not
router.use("/contacts", contactRoutes);

export default router;
