import crypto from 'crypto'

/*
 * Generate the future date from current date.
 * @params {number} - The time in millisecond to add to the current time.
 * @returns {Date} - The future date. 
*/
export function getFutureDate(millisecond){
    const now = new Date()
    const futureDate = new Date(now.getTime() + millisecond)
    return futureDate 
}


/*
 * Generate a random verification code using base64url encoding.
 * @returns {string} - The generated verification code.
*/
export function generateVerificationCode(){
    let buffer = crypto.randomBytes(32)
    return buffer.toString('base64url')
}