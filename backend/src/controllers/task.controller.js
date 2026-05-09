import { Task } from "../models/task.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

// Create Task 
const createTask = asyncHandler(async (req , res) =>{
    const {title, description } = req.body;

    if (!title?.trim()) {
        throw new ApiError(400, "Title is required");
    }

    // CHECK DUPLICATE TASK
    const existedTask = await Task.findOne({
        title,
        createdBy: req.user._id,
    });

    if (existedTask) {
        throw new ApiError(409,"Task already exists");
    }

    const task = await Task.create({
        title,
        description,
        createdBy: req.user._id,
    });

    return res
        .status(201)
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

// Update Task
const updateTask = asyncHandler(async(req,res) => {
    const {id} = req.params;

    const { title, description, completed } = req.body;

    // CHECK EMPTY UPDATE
    if (
        title === undefined &&
        description === undefined &&
        completed === undefined
    ) {
        throw new ApiError(
            400,
            "At least one field is required to update"
        );
    }

    const existingTask = await Task.findById(id);

    if(!existingTask){
        throw new ApiError(404,"Task not found");
    }

    // CHECK OWNERSHIP
    if (
        existingTask.createdBy.toString() !==
        req.user._id.toString()
    ) {
        throw new ApiError(
            403,
            "Unauthorized action"
        );
    }

    const task = await Task.findByIdAndUpdate(
        id,
        req.body,
        {
            returnDocument: "after",
            runValidators: true,
        }
    );


    return res
        .status(200)
        .json(new ApiResponse(200,task ,"Task updated Successfully"))
})

// Delete Task
const deleteTask = asyncHandler(async(req,res) => {
    const { id } = req.params;


    const task = await Task.findById(id);

        if (!task) {
            throw new ApiError(404, "Task not found");
        }

        if (task.createdBy.toString() !== req.user._id.toString()) {
            throw new ApiError(403, "Unauthorized action");
        }

        await Task.findByIdAndDelete(id);

    return res
        .status(200)
        .json(new ApiResponse(200,{},"Task deleted successfully"));
})


export { 
    createTask,
    getTasks,
    updateTask, 
    deleteTask
}
