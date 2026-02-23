const express = require('express')
const router = express.Router()

const {
    getAllBooks,
    getCurrentBook,
    createBook,
    updateBook,
    deleteBook,
} = require('../controllers/jobs')

router.route('/').post(createBook).get(getAllBooks)
router.route('/:id').get(getCurrentBook).delete(deleteBook).patch(updateBook)

module.exports = router