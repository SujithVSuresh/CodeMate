import express from  'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', userController.signup);
router.get('/verify/:code', userController.verifyEmail)

export default router

