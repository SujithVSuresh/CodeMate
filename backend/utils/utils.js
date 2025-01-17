import crypto from 'crypto'



/*
 * Generate a random verification code using base64url encoding.
 * @returns {string} - The generated verification code.
*/
export function generateVerificationCode(){
    let buffer = crypto.randomBytes(32)
    return buffer.toString('base64url')
}