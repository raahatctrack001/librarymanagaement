import express from 'express'
import { verifyAdmin, verifyUser } from '../middlewares/auth.midleware.js';
import { 
    addBook, 
    deleteBook, 
    getAllBooks, 
    getAvailableBooks, 
    getBook,
    searchBook,
    updateBook,
    updateBookImage
} from '../controllers/book.controller.js';
import upload from '../middlewares/multer.midleware.js';
const router = express.Router();

router.route('/update-book-image/:bookId').patch(upload.single('bookImage'), verifyUser, updateBookImage);
router.route('/add-book').post(upload.none(), verifyUser, addBook);
router.route('/get-all-books').get(getAllBooks);
router.route('/get-book/:bookId').get(getBook);
router.route('/update-book/:bookId').patch(upload.none(), verifyUser, updateBook); //leftover
router.route('/delete-book/:bookId/:adminId').delete(verifyUser, deleteBook);
router.route('/get-available-book').get(getAvailableBooks);
router.route('/search-books/:searchTerm').get(upload.none(), searchBook);

export default router;