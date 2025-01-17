import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import { errorHandler } from './middleware/errormiddleware.js'

const port = process.env.PORT || 5000
connectDB()

const app = express()

app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRoutes)

app.use(errorHandler)

app.listen(3000, () => {
    console.log(`⚡ [server] Started listening on http://localhost:${port}`)
})