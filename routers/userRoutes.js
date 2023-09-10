import express  from "express";

// controllers
import { userRegister, userLogin, userLogout} from "../controllers/userController.js";

export const router = express.Router()

router.route("/register").post(userRegister)
router.route("/login").post(userLogin)
router.route("/logout").post(userLogout)



