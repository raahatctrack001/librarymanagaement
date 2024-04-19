
import express from 'express'
import { 
    getAllLonedBooks, 
    getDueSoonLone, 
    getLoanDetail, 
    getLoneHistoryOfUser, 
    getOverDueLone, 
    reserveBook, 
    returnBook 
} from '../controllers/issuedBook.controller.js';
import { verifyUser } from '../middlewares/auth.midleware.js';

const router = express.Router();

router.route('/reserve-book').post(verifyUser, reserveBook)
router.route('/return-book/:bookId').post(verifyUser, returnBook)
router.route('/get-loan-detail/:bookId').post(verifyUser, getLoanDetail)
router.route('/get-all-loned-book').post(verifyUser,getAllLonedBooks)
router.route('/get-loned-history/:userId').post(verifyUser, getLoneHistoryOfUser)
router.route('/get-overdue-loan/:userId').post(verifyUser, getOverDueLone)
router.route('/get-due-soon-loand/:userId').post(verifyUser, getDueSoonLone)

export default router