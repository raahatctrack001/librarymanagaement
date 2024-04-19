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

const router = express.Router();

router.route('/add-book').post(verifyAdmin, addBook);
router.route('/get-all-book').get(getAllBooks);
router.route('/get-book').get(getBook);
router.route('/update-book').patch(verifyAdmin, updateBook);
router.route('/delete-book').delete(verifyAdmin, deleteBook);
router.route('/get-available-book').get(getAvailableBooks);
router.route('/search-book').get(searchBook);

export default router;