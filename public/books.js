console.log("books.js loaded");

import {
  inputEnabled,
  setDiv,
  message,
  setToken,
  token,
  enableInput,
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showAddEdit } from "./addEdit.js";

let booksDiv = null;
let booksTableBody = null;

export const handleBooks = () => {
  booksDiv = document.getElementById("books");
  console.log("booksDiv is:", booksDiv);
  const logoff = document.getElementById("logoff");
  const addBook = document.getElementById("addBook");
  booksTableBody = document.getElementById("books-table-body");

  booksDiv.addEventListener("click", async (e) => {
    console.log("Books div clicked");
    const button = e.target.closest("button");
    console.log("Button found:", button);
    if (!button) return;
    //if (!inputEnabled || !button) return;

    console.log("clicked:", button.id);

    // Add a new book
    if (button.id === "addBook") {
      console.log("Add book clicked");
      showAddEdit(null);

      // Log off
    } else if (button.id === "logoff") {
      setToken(null);
      message.textContent = "You have been logged off.";
      booksTableBody.replaceChildren();
      showLoginRegister();

      // Edit a book
    } else if (button.classList.contains("editButton")) {
      message.textContent = "";
      showAddEdit(button.dataset.id);

      // Delete a book
    } else if (button.classList.contains("deleteButton")) {
      const bookId = button.dataset.id;

      try {
        const response = await fetch(`/api/v1/books/${bookId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.status === 200) {
          message.textContent = data.msg; // e.g., "The entry was deleted."
          showBooks(); // refresh the table
        } else {
          message.textContent = data.msg;
        }
      } catch (err) {
        console.log(err);
        message.textContent = "A communication error occurred.";
      }
    }
  });
};

export const showBooks = async () => {
  try {
    enableInput(false);

    const response = await fetch("/api/v1/books", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    booksTableBody.replaceChildren();

    if (response.status === 200 && data.count > 0) {
      data.books.forEach((book) => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${book.bookTitle}</td>
          <td>${book.genre}</td>
          <td>${book.author}</td>
          <td>${book.rating}</td>
          <td>${book.review}</td>
          <td><button type="button" class="editButton" data-id="${book._id}">edit</button></td>
          <td><button type="button" class="deleteButton" data-id="${book._id}">delete</button></td>
        `;

        booksTableBody.appendChild(row);
      });
    }
  } catch (err) {
    console.log(err);
    message.textContent = "A communication error occurred.";
  } finally {
    enableInput(true);
    setDiv(booksDiv);
  }
};
