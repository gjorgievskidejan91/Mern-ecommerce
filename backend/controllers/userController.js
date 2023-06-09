import asyncHandler from "../middleware/asyncHandler.js";
import Users from "../models/userModel.js";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";

//desc    Auth user and get token
//route   POST /api/users/login
//acess   Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: "1d",
    // });
    // //Set Jwt token as an HTTP-Only cookie
    // res.cookie("jwt", token),
    //   {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV !== "development", //Use  secure cookies in production
    //     sameSite: "strict", // Prevent CSRF attaks
    //     maxAge: 30 * 24 * 60 * 60 * 1000, //30days
    //   };
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  console.log();
  res.send("auth user/login");
});

//desc    Register a new user
//route   POST /api/users
//acess   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await Users.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await Users.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
//desc    Logout user / clear cookie
//route   POST /api/users/logout
//acess   Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});
//desc    Get user profile
//route   GET /api/users/profile
//acess   Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      message: "message",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
  res.send("get user profile");
});
//desc    Update user profile
//route   PUT /api/users/profile
//acess   Private/
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updateUser = await user.save();

    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//desc    Get all users
//route   GET /api/users
//acess   Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});

//desc    Delete user
//route   DELETE /api/users/:id
//acess   Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete users");
});
//desc    Get USer By ID
//route   GET /api/users/:id
//acess   Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("get user by Id");
});
//desc    Update user
//route   PUT /api/users/:id
//acess   Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});
export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
