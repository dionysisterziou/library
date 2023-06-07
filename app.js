const buttonAdd = document.querySelector("#buttonAdd");
const bookForm = document.querySelector("#bookForm");

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function showForm() {
  bookForm.style.display = bookForm.style.display === 'none' ? 'block' : 'none';
}

function addBookToLibrary(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="title"]').value;
  const author = document.querySelector('input[name="author"]').value;
  const pages = document.querySelector('input[name="pages"]').value;
  const read = false;

  const book = new Book(title, author, pages, read);

  myLibrary.push(book);
  displayBook();
}

function removeBook(event) { 
  const button = event.target;
  const bookIndex = parseInt(button.getAttribute('data-index'));

  myLibrary.splice(bookIndex, 1);
  displayBook();
}

function changeStatus(event) {
  const button = event.target;

  button.textContent = button.textContent === 'Read' ? 'Not read' : 'Read';
}

function displayBook() {
  const library = document.querySelector('#library');
  library.innerHTML = ''; // Clear existing content before re-rendering

  myLibrary.forEach((book, index) => {
    const div = document.createElement('div');
    const buttonDelete = document.createElement('button');
    const buttonRead = document.createElement('button');

    buttonDelete.textContent = 'Remove';
    buttonRead.textContent = 'Read';
    buttonDelete.setAttribute('data-index', index);
    buttonDelete.addEventListener('click', removeBook);
    buttonRead.addEventListener('click', changeStatus);

    for (const value of Object.values(book)) {
      const p = document.createElement('p');

      p.textContent = `${value}`;
      div.appendChild(p);
    }

    div.appendChild(buttonDelete);
    div.appendChild(buttonRead);
    library.appendChild(div);
  });
}

buttonAdd.addEventListener('click', showForm);
bookForm.addEventListener('submit', addBookToLibrary);