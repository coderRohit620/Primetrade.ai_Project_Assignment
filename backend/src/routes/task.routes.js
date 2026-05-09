import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";


import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";


const router = Router();

router.route("/")
  .post(verifyJWT, createTask)
  .get(verifyJWT, getTasks);

router.route("/:id")
  .patch(verifyJWT, updateTask)
  .delete(verifyJWT, deleteTask);

export default router;