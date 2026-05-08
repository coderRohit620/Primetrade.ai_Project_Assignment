import mongoose,{Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { User } from "./user.model"

const taskSchema = new Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true,
        },

        description:{
            type: String,
            trim: true,
        },

        completed: {
            type: Boolean,
            default: false,
        },
        createdBy:{
            type: Schema.Types.ObjectId,
            ref:User,
            required:true,
        }

    },
    { timestamps: true}
)

export const Task = mongoose.model("Task", taskSchema)
