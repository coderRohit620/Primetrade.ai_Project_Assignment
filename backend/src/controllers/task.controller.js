import { syncIndexes } from "mongoose";
import { Task } from "../models/task.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

// Create Task 
const createTask = asyncHandler(async (req , res) =>{
    const {title, description } = req.body;

    if (!title) {
        throw new ApiError(400, "Title is required");
    }
    const task = await Task.create({
        title,
        description,
        createdBy: req.user._id,
    });

    return res
        .status(500)
        .json(new ApiResponse(201, task, "Task created Successfully"));
});

// Get all Task
const getTasks = asyncHandler(async (req, res) =>{

    const tasks = await Task.find({
        createdBy: req.user._id,
    });

    return res.status(200)
        .json(new ApiResponse(200, tasks, "Task featched Successfully"))
})

// Update All Task
const updateTask = asyncHandler(async(req,res) => {
    const { id } = req.params;

    const updatedTask = await Task.findByIdAndUpdate(
        id,
        req.body,
        {
            new:true,
        }
    );

    if(!updatedTask){
        throw new ApiError(404, "Task not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200,updatedTask,"Task updated Successfully"))
})

// Delete Task
const deleteTask = asyncHandler(async(req,res) => {
    const {id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if(!task){
        throw new ApiError(404," Task not found")
    }

    return res
        .status(200)
        .json(new ApiResponse(200,{},"Task deleted Successfully"));
})


export { 
    createTask,
    getTasks,
    updateTask, 
    deleteTask
}
