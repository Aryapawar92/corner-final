import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.Models.js";

const registerUser = asyncHandler(async (req, res) => {
  //take imput of email and password
  //check if user exists
  //create user
  //return success

  const { firstName, lastName, email, password } = req.body;
  console.log(req.body);

  if (
    [firstName, lastName, email, password].some((field) => field?.trim()) === ""
  ) {
    throw new ApiError(400, "All fields are Required");
  }

  const existedUser = await User.findOne({
    email,
  });

  if (existedUser) {
    throw new ApiError(400, "User already exists");
  }

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  if (!newUser) {
    throw new ApiError("Something went wrong", 500);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "User created successfully", newUser));
});

export { registerUser };
