import express from 'express';
import { 
    continueWithGoogle,
    deleteUserByAdmin,
    logInUser, 
    logOutUser, 
    registerUser, 
    resetPassword,
    updatePassword
} from '../controllers/auth.controller.js';
import { 
    verifyAdmin, 
    verifyUser 
} from '../middlewares/auth.midleware.js';
import upload from '../middlewares/multer.midleware.js';

const router = express.Router()

router.route('/register').post(upload.none(),  registerUser);
router.route('/login').post(upload.none(), verifyUser, logInUser);
router.route('/logout').post(verifyUser, logOutUser);
router.route('/reset-password').patch(verifyUser, resetPassword);
router.route('/update-password').patch(verifyUser, updatePassword);
router.route('/google').post(continueWithGoogle);
router.route('/delete-user').delete(verifyAdmin, deleteUserByAdmin);

export default router
