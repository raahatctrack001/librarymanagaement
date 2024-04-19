import express from 'express'
import { 
    continueWithGoogle,
    deleteUser,
    logInUser, 
    logOutUser, 
    registerUser, 
    resetPassword
} from '../controllers/auth.controller.js';
import { verifyUser } from '../middlewares/auth.midleware.js';
import upload from '../middlewares/multer.midleware.js';

const router = express.Router()

router.route('/register').post(upload.none(),  registerUser)
router.route('/login').post(upload.none(), logInUser);
router.route('/delete-user').delete(verifyUser, deleteUser)
router.route('/reset-password').post(verifyUser, resetPassword)
router.route('/logout').post(verifyUser, logOutUser)
router.route('/google').post(continueWithGoogle);

export default router