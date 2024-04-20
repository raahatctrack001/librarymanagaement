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

router.route('/update-profile-picture').patch(verifyUser, updateProfilePicture);
router.route('/update-account-details').patch(verifyUser, updateAccountDetails);
router.route('/get-all-users').get(verifyUser, getAllUsers);
router.route('/get-user/:userId').get(verifyAdmin, getSpecificUser);
router.route('/delete-user/:userId').delete(verifyUser, deleteUser);

export default router;