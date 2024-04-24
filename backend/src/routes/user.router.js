import express from 'express';
import { verifyAdmin, verifyUser } from '../middlewares/auth.midleware.js';
import { 
    deleteUser, 
    getAllUsers, 
    getSpecificUser, 
    searchUser, 
    updateAccountDetails, 
    updateProfilePicture 
} from '../controllers/user.controller.js';
import upload from '../middlewares/multer.midleware.js';
// import {getAllLonedUsers } from '../controllers/reservedBook.controller.js';

const router = express.Router();

router.route('/update-profile-picture/:userId').patch(upload.single('profile-image'), verifyUser, updateProfilePicture);
router.route('/update-account-details').patch(verifyUser, updateAccountDetails);
router.route('/get-all-users').get(verifyUser, getAllUsers);
router.route('/get-user/:userId').get(verifyAdmin, getSpecificUser);
router.route('/delete-user/:userId').delete(verifyUser, deleteUser);
router.route('/search-user/:searchTerm').get(verifyUser, searchUser);

export default router;