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
let booksTable = null;
let booksTableHeader = null;

export const handleBooks = () => {
  booksDiv = document.getElementById("books");
  const logoff = document.getElementById("logoff");
  const addBook = document.getElementById("add-book");
  booksTable = document.getElementById("books-table");
  booksTableHeader = document.getElementById("books-table-header");

  booksDiv.addEventListener("click", async (e) => {
    if (!inputEnabled || e.target.nodeName !== "BUTTON") return;

    // Add a new book
    if (e.target === addBook) {
      showAddEdit(null);

      // Log off
    } else if (e.target === logoff) {
      setToken(null);
      message.textContent = "You have been logged off.";
      booksTable.replaceChildren([booksTableHeader]);
      showLoginRegister();

      // Edit a book
    } else if (e.target.classList.contains("editButton")) {
      message.textContent = "";
      showAddEdit(e.target.dataset.id);

      // Delete a book
    } else if (e.target.classList.contains("deleteButton")) {
      const bookId = e.target.dataset.id;

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
    let children = [booksTableHeader];

    if (response.status === 200) {
      if (data.count === 0) {
        booksTable.replaceChildren(...children); // clear this for safety
      } else {
        for (let i = 0; i < data.books.length; i++) {
          let rowEntry = document.createElement("tr");

          let editButton = `<td><button type="button" class="editButton" data-id=${data.books[i]._id}>edit</button></td>`;
          let deleteButton = `<td><button type="button" class="deleteButton" data-id=${data.books[i]._id}>delete</button></td>`;
          let rowHTML = `
            <td>${data.books[i].bookTitle}</td>
            <td>${data.books[i].author}</td>
            <td>${data.books[i].genre}</td>
            <td>${data.books[i].rating}</td>
            <td>${data.books[i].review}</td>
            
            <div>${editButton}${deleteButton}</div>`;

          rowEntry.innerHTML = rowHTML;
          children.push(rowEntry);
        }
        booksTable.replaceChildren(...children);
      }
    } else {
      message.textContent = data.msg;
    }
  } catch (err) {
    console.log(err);
    message.textContent = "A communication error occurred.";
  }
  enableInput(true);
  setDiv(booksDiv);
};
