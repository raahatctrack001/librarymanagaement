
import express from 'express'
import { 
    getAllLonedBooks, 
    getDueSoonLone, 
    getLoanDetail, 
    getLoneHistoryOfUser, 
    getOverDueLone, 
    reserveBook, 
    returnBook 
} from '../controllers/reservedBook.controller.js';
import { verifyUser } from '../middlewares/auth.midleware.js';
import upload from '../middlewares/multer.midleware.js';

const router = express.Router();

router.route('/reserve-book/:bookId').post(upload.none(), verifyUser, reserveBook);
router.route('/return-book/:bookId').post(upload.none(), verifyUser, returnBook);
router.route('/get-loan-detail/:bookId').get(verifyUser, getLoanDetail);
router.route('/get-all-loaned-book').get(verifyUser,getAllLonedBooks);
router.route('/get-loan-history').get(upload.none(), verifyUser, getLoneHistoryOfUser);
router.route('/get-overdue-loan').post(verifyUser, getOverDueLone);
// router.route('/get-due-soon-loaned/:userId').post(verifyUser, getDueSoonLone);

export default router