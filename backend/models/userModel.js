import mongoose from "mongoose";
import { getFutureDate } from "../utils/utils.js";


const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: false
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        verified: {
            type: Boolean,
            required: true,
            default: false
        },
        password: {
            type: String,
            required: true
        },
        preferences: {
            emailNotifications: {
                type: Boolean,
                default: false,
                required: true
            },
            mfa: {
                type: Boolean,
                default: false,
                required: true
            }
        },
        otpRequested: {
            type: Boolean,
            default: false,
            required: true
        },
        otp: {
            type: String
        },
        otpExpiry: {
            type: Date
        },
        verificationCodeRequested: {
            type: Boolean,
            default: false,
            required: true
        },
        verificationCode: {
            type: String
        },
        verificationCodeExpiry: {
            type: Date
        }
    },
    {
        timestamps: true
    }
)


userSchema.methods.setVerificationCode = async function (code) {
    try{
        this.verificationCodeRequested = true
        this.verificationCode = code
        this.verificationCodeExpiry = getFutureDate(2 * 60 * 60 * 1000) //2hr
        await this.save()
        return true
    }catch(error){
        console.log("Error generating code", error)
        return false
    }
}

const User = mongoose.model('User', userSchema)

export default User;