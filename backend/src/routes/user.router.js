import express from 'express';
import { verifyUser } from '../middlewares/auth.midleware.js';
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
router.route('/get-all-users').post(verifyUser, getAllUsers)
router.route('/get-user/:userId').post(verifyUser, getSpecificUser)
router.route('/delete-user/:userId').post(verifyUser, deleteUser)

export default router;