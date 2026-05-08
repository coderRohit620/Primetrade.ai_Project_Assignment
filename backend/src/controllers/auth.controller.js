import {User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"



const registerUser = asyncHandler(async (req, res) => {
    const {username,email,password } = req.body;

    if(username || email || password == ""){
        throw new ApiError(400,"All fields are Required")
    }
    // checking user Exist or not
    const existedUser = await User.findOne({
        $or:[{username}, {email}],
    });

    if(existedUser){
        throw new ApiError(409, "User alredy exists")
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password,
    });

    const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registring the user");
    }



    return res
        .status(201)
        .json(new ApiResponse(200,createdUser,"User registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
    const {email, username,password} = req.body

    if(!username && !email){
        throw new ApiError(400, "Username and Password is required")
    }

    const user = await User.findOne({
        $or:[{username}, {email}],
    });

})


