import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'

const port = process.env.PORT || 5000
connectDB()

const app = express()

app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(3000, () => {
    console.log(`⚡ [server] Started listening on http://localhost:${port}`)
})