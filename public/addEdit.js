import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showBooks } from "./books.js";

let addEditDiv = null;
let bookTitle = null;
let author = null;
let genre = null;
let rating = null;
let review = null;
let addingBook = null;

export const handleAddEdit = () => {
  addEditDiv = document.getElementById("edit-book");
  bookTitle = document.getElementById("bookTitle");
  author = document.getElementById("author");
  genre = document.getElementById("genre");
  rating = document.getElementById("rating");
  review = document.getElementById("review");

  addingBook = document.getElementById("adding-book");
  const editCancel = document.getElementById("edit-cancel");

  addEditDiv.addEventListener("click", (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addingBook) {
        showBooks();
      } else if (e.target === editCancel) {
        showBooks();
      }
    }
  });
};

export const showAddEdit = (book) => {
  message.textContent = "";
  setDiv(addEditDiv);
};
