import express from 'express';
import { 
    continueWithGoogle,
    deleteUserByAdmin,
    logInUser, 
    logOutUser, 
    registerUser, 
    resetPassword
} from '../controllers/auth.controller.js';
import { 
    verifyAdmin, 
    verifyUser 
} from '../middlewares/auth.midleware.js';
import upload from '../middlewares/multer.midleware.js';

const router = express.Router()

router.route('/register').post(upload.none(),  registerUser)
router.route('/login').post(upload.none(), verifyUser, logInUser);
router.route('/delete-user').delete(verifyAdmin, deleteUserByAdmin)
router.route('/reset-password').patch(verifyUser, resetPassword)
router.route('/logout').post(verifyUser, logOutUser)
router.route('/google').post(continueWithGoogle);

export default router
