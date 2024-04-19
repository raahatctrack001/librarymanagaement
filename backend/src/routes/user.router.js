import express from 'express';
import { verifyAdmin, verifyUser } from '../middlewares/auth.midleware.js';
import { 
    deleteUser, 
    getAllUsers, 
    getSpecificUser, 
    updateAccountDetails, 
    updateProfilePicture 
} from '../controllers/user.controller.js';

const router = express.Router();

router.route('/update-profile-picture').post(verifyUser, updateProfilePicture)
router.route('/update-account-details').patch(verifyUser, updateAccountDetails)
router.route('/get-all-users').post(verifyAdmin, getAllUsers)
router.route('/get-user/:userId').post(verifyAdmin, getSpecificUser)
router.route('/delete-user/:userId').post(verifyUser, deleteUser)

export default router;