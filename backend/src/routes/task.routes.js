import { Router } from "express";

import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/")
  .post(verifyJWT, createTask)
  .get(verifyJWT, getTasks);

router.route("/:id")
  .put(verifyJWT, updateTask)
  .delete(verifyJWT, deleteTask);

export default router;