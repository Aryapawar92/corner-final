import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.Models.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error in generateAccessAndRefreshToken:", error);
    throw new ApiError(
      500,
      "Something went wrong while creating or accessing the tokens"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //take imput of email and password
  //check if user exists
  //create user
  //return success

  const { firstName, lastName, email, password } = req.body;
  console.log(req.body);

  if ([firstName, lastName, email, password].some((field) => !field?.trim())) {
    throw new ApiError(400, "All fields are required");
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

  const createdUser = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(400, "Something went Wrong");
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

  console.log(req.body);

  if (!email && !password) {
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

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    existedUser._id
  );

  const loggedInUser = await User.findById(existedUser._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    //secure: false,
    //sameSite: "Lax",
  };

  //console.log(accessToken, refreshToken);
  //localStorage.setItem("authToken", accessToken);

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { accessToken: accessToken },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  //check if user is LoggedIn
  //then logout

  const user = await User.findByIdAndUpdate(
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
    //sameSite: "Strict",
  };

  //localStorage.removeItem("authToken");

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "User logged out successfully", user));
});

export { registerUser, loginUser, logoutUser };
