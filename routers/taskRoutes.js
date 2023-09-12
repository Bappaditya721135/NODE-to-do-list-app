import express from "express";
import { isAuthenticated } from "../utils/isAuthenticated.js";

// controllers 
import {getMyTask, createTask, updateTask, deleteTask} from "../controllers/taskController.js";


export const router = express.Router()


router.route("/my-task").get(isAuthenticated, getMyTask);


router.route("/new").post(isAuthenticated, createTask)

router.route("/:id").put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask)