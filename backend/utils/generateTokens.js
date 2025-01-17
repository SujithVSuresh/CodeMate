import jwt from 'jsonwebtoken'

const generateTokens = (res, userId) => {
    // We have created the jwt token and set the token into cookie.
    const token = jwt.sign(
        { userId }, 
        secretKey, 
        { expiresIn: "30d" }
    )

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV != 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 //30d
    })

}

export default generateTokens