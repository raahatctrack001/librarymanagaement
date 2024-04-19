import express from 'express'
import { verifyUser } from '../middlewares/auth.midleware.js';
import { 
    addBook, 
    deleteBook, 
    getAllBooks, 
    getAvailableBooks, 
    getBook,
    searchBook,
    updateBook
} from '../controllers/book.controller.js';

const router = express.Router();

router.route('/add-book').post(verifyUser, addBook);
router.route('/get-all-book').get(verifyUser, getAllBooks);
router.route('/get-book').get(verifyUser, getBook);
router.route('/update-book').patch(verifyUser, updateBook);
router.route('/delete-book').delete(verifyUser, deleteBook);
router.route('/get-available-book').get(verifyUser, getAvailableBooks);
router.route('/search-book').get(verifyUser, searchBook);

export default router;