import express from 'express'
import { verifyAdmin, verifyUser } from '../middlewares/auth.midleware.js';
import { 
    addBook, 
    deleteBook, 
    getAllBooks, 
    getAvailableBooks, 
    getBook,
    searchBook,
    updateBook
} from '../controllers/book.controller.js';
import upload from '../middlewares/multer.midleware.js';
const router = express.Router();

router.route('/add-book').post(upload.none(), verifyUser, addBook);
router.route('/get-all-books').get(getAllBooks);
router.route('/get-book/:bookId').get(getBook);
router.route('/update-book/:bookId').patch(upload.none(), verifyUser, updateBook); //leftover
router.route('/delete-book/:bookId').delete(verifyUser, deleteBook);
router.route('/get-available-book').get(getAvailableBooks);
router.route('/search-book/:isbn').get(searchBook);

export default router;