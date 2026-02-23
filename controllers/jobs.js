//my final proj will be a book reviewing site,
//so I'm replacing the job functions with my own
const Book = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllBooks = async (req, res) => {
  res.send("get all books");
};

const getCurrentBook = async (req, res) => {
  res.send("get Current Book");
};

const createBook = async (req, res) => {
  req.body.createBy = req.user.userId;
  const book = await Book.create(req.body);
  res.status(StatusCodes.CREATED).json({ book });
};

const updateBook = async (req, res) => {
  res.send("update Book");
};

const deleteBook = async (req, res) => {
  res.send("delete Book");
};

module.exports = {
  getAllBooks,
  getCurrentBook,
  createBook,
  updateBook,
  deleteBook,
};
