//my final proj will be a book reviewing site,
//so I'm replacing the job functions with my own
const Book = require("../models/Book");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllBooks = async (req, res) => {
  const books = await Book.find({ createdBy: req.user.userId }).sort(
    "createdAt",
  );
  res.status(StatusCodes.OK).json({ books, count: books.length });
};

const getCurrentBook = async (req, res) => {
  const {
    user: { userId },
    params: { id: bookId },
  } = req;

  const book = await Book.findOne({
    _id: bookId,
    createdBy: userId,
  });
  if (!book) {
    throw new NotFoundError(`No book with id ${bookId}`);
  }
  res.status(StatusCodes.OK).json({ book });
};

const createBook = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const book = await Book.create(req.body);
  res.status(StatusCodes.CREATED).json({ book });
};

const updateBook = async (req, res) => {
  const {
    body:{rating, review},
    user: { userId },
    params: { id: bookId },
  } = req;

  if(rating === '' || review === '') {
    throw new BadRequestError('Rating or review fields cannot be empty')
  }
const book = await Book.findByIdAndUpdate({_id:bookId,createdBy:userId},req.body, {new:true,
  runValidators:true})
if (!book) {
    throw new NotFoundError(`No book with id ${bookId}`);
  }
  res.status(StatusCodes.OK).json({ book });
};

const deleteBook = async (req, res) => {
  const {
    user: { userId },
    params: { id: bookId },
  } = req

  const book = await Book.findByIdAndRemove({
    _id:bookId,
    createdBy:userId
  })
  if (!book) {
    throw new NotFoundError(`No book with id ${bookId}`);
  }
  res.status(StatusCodes.OK).send()
};

module.exports = {
  getAllBooks,
  getCurrentBook,
  createBook,
  updateBook,
  deleteBook,
};
