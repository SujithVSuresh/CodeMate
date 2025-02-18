import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateTokens from "../utils/generateTokens.js";
import { generateVerificationCode, getVerificationlink } from "../utils/utils.js";



// @desc    Register a new user
// route    POST /api/user/signup
// @access  Public
const signup = asyncHandler(async (req, res) => {
//   const { username, email, password } = req.body;

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
    
    const code = generateVerificationCode()
    const success = await user.setVerificationCode(code)
    if(!success){
        throw new Error("Unable to set verification code.")
    }
    //generate verification link
    const verificationLink = getVerificationlink(user._id, code)
    console.log(verificationLink)
    //send verification email
  } else {
    res.status(400)
    throw new Error("invalid user data")
  }
});


const verifyEmail = asyncHandler(async (req, res) => {
    console.log("hello how are you")
})

export default {
    signup,
    verifyEmail
}
