const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

const theHobbit = new Book("The Hobbit", "J.R.R Toliken", 295, false);
const harryPotter = new Book("Harry Potter", "J.K Rowling", 301, true);
myLibrary.push(theHobbit, harryPotter);
console.log(myLibrary);

function addBookToLibrary() {
  const bookContainer = document.querySelector("#book-container");

  bookContainer.innerHTML = "";
  // Loop thorugh the library and create a card for each book
  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.dataset.index = index;

    const readButton = document.createElement("button");
    readButton.textContent = book.read ? "Mark as Unread" : "Mark as Read";
    readButton.addEventListener("click", () => {
      book.toggleRead();
      readButton.textContent = book.read ? "Mark as Unread" : "Mark as Read";
    });

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      addBookToLibrary();
    });

    // Populate the card with book details
    bookCard.innerHTML = `
<h3>${book.title}</h3>
<p>Author: ${book.author}</p>
<p>Pages: ${book.pages}</p>
<p>Read: ${book.read}</p>
`;

    bookCard.appendChild(readButton);
    bookCard.appendChild(removeButton);
    bookContainer.appendChild(bookCard);
  });
}

const newBookButton = document.querySelector("#new-book-button");
const bookForm = document.getElementById("book-form");
newBookButton.addEventListener("click", () => {
  bookForm.classList.remove("hidden");
});

const addBookForm = document.getElementById("add-book-form");
addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  //Get form input values
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = parseInt(document.getElementById("pages").value, 10);
  const read = document.getElementById("read").checked;

  //create a newBook object
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);

  addBookForm.reset();
  console.log(myLibrary);
  addBookToLibrary();
});

addBookToLibrary();

// function Book(title, author, pages, read) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
// }

// const theHobbit = new Book("The Hobbit", "J.R.R Toliken", 295, false);
// const harryPotter = new Book("Harry Potter", "J.K Rowling", 400, true);

// Book.prototype.info = function () {
//   const readStatus = this.read ? "read" : "not read yet";
//   return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
// };

// console.log(theHobbit.info());
