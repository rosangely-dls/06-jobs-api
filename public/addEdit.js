console.log("addEdit.js loaded");

import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showBooks } from "./books.js";

let addEditDiv = null;
let bookTitle = null;
let author = null;
let genre = null;
let rating = null;
let review = null;
let addingBook = null;
let editCancel = null;

export const handleAddEdit = () => {
  addEditDiv = document.getElementById("edit-book");
  bookTitle = document.getElementById("bookTitle");
  author = document.getElementById("author");
  genre = document.getElementById("genre");
  rating = document.getElementById("rating");
  review = document.getElementById("review");

  addingBook = document.getElementById("addingBook");
  editCancel = document.getElementById("edit-cancel");

  addEditDiv.addEventListener("click", async (e) => {
    const button = e.target.closest("button");

    if (inputEnabled && button) {
      if (button.id === "addingBook") {
        enableInput(false);

        let method = "POST";
        let url = "/api/v1/books";

        if (addingBook.textContent === "update") {
          method = "PATCH";
          url = `/api/v1/books/${addEditDiv.dataset.id}`;
        }

        try {
          const response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              bookTitle: bookTitle.value,
              author: author.value,
              genre: genre.value,
              rating: Number(rating.value),
              review: review.value,
            }),
          });

          const data = await response.json();

          if (response.status === 200 || response.status === 201) {
            message.textContent =
              response.status === 200
                ? "The book entry was updated."
                : "The book review was created.";

            bookTitle.value = "";
            author.value = "";
            genre.value = "";
            rating.value = "";
            review.value = "";

            showBooks();
          } else {
            message.textContent = data.msg;
          }
        } catch (err) {
          console.log(err);
          message.textContent = "A communication error occurred.";
        }

        enableInput(true);
      } else if (button.id === "edit-cancel") {
        message.textContent = "";
        showBooks();
      }
    }
  });
};

export const showAddEdit = async (bookId) => {
  console.log("showAddEdit triggered");

  addEditDiv = document.getElementById("edit-book");
  bookTitle = document.getElementById("bookTitle");
  author = document.getElementById("author");
  genre = document.getElementById("genre");
  rating = document.getElementById("rating");
  review = document.getElementById("review");

  if (!bookId) {
    bookTitle.value = "";
    author.value = "";
    genre.value = "";
    rating.value = "";
    review.value = "";

    setDiv(addEditDiv);
  } else {
    enableInput(false);

    try {
      const response = await fetch(`/api/v1/books/${bookId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        bookTitle.value = data.book.bookTitle;
        genre.value = data.book.genre;
        author.value = data.book.author;
        rating.value = data.book.rating;
        review.value = data.book.review;
        message.textContent = "";
        addEditDiv.dataset.id = bookId;

        setDiv(addEditDiv);
      } else {
        message.textContent = "The book entry was not found";
        showBooks();
      }
    } catch (err) {
      console.log(err);
      message.textContent = "A communications error has occurred.";
      showBooks();
    }

    enableInput(true);
  }
};
