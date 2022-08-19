import { Router } from "express";
import * as signupController from '../controllers/signupController'

const router = Router();
router.post('/', signupController.signup);

export default router;