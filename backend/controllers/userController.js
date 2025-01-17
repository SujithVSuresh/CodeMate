import User from "../models/userModel";
import asyncHandler from "express-async-handler";
import generateTokens from "../utils/generateTokens";


// @desc    Register a new user
// route    POST /api/user/signup
// @access  Public
const signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser =
    (await User.findOne({ email })) || (await User.findOne({ username }));

  if (existingUser) {
    if (existingUser.verified) {
      //sends an error message if verified user already exists.
      res.status(409);
      throw new Error("User already exists.");
    } else {
      //deleting that user if he is unverified.
      existingUser.deleteOne();
    }
  }

  const user = await User.create({ username, email, password });
  if (user) {
    generateTokens(res, user._id);
    res.status(201).json({
      success: true,
      message: "Account has been created successfully.",
    });
    console.log(`✨ [register] @${user.username} has registered an account.`);
    //todo
    //generate verification code
    //set verification code
    //generate verification link
    //send verification email
  } else {
  }
});
