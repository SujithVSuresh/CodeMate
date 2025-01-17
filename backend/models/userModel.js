import mongoose from "mongoose";


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

const User = mongoose.model('User', userSchema)

export default User;