import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.Models.js";

const generateAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();

    return accessToken;
  } catch (error) {
    console.log("Error: ", error);
    throw new ApiError(400, "Error generating access token");
  }
};

const generateRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return refreshToken;
  } catch (error) {
    console.log("Error: ", error);
    throw new ApiError(400, "Error generating refresh token");
  }
};

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

const loginUser = asyncHandler(async (req, res) => {
  //take imput of email and password
  //check if user exists
  //check password
  // then login

  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fields are Required");
  }

  const existedUser = await User.findOne({
    email,
  });

  if (!existedUser) {
    throw new ApiError(400, "User does not exist");
  }

  const isPasswordValid = await existedUser.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Password is incorrect");
  }

  const accessToken = await generateAccessToken(existedUser._id);
  const refreshToken = await generateRefreshToken(existedUser._id);

  const loggedInUser = await User.findById(existedUser._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, "User logged in successfully", loggedInUser));
});

const logoutUser = asyncHandler(async (req, res) => {
  //check if user is LoggedIn
  //then logout

  const loggedOut = await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        accessToken: 1,
      },
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "User logged out successfully", loggedOut));
});

export { registerUser, loginUser, logoutUser };
