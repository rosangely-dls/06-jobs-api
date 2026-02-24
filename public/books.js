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

  booksDiv.addEventListener("click", (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addBook) {
        showAddEdit(null);
      } else if (e.target === logoff) {
        showLoginRegister();
      }
    }
  });
};

export const showBooks = async () => {
  setDiv(booksDiv);
};