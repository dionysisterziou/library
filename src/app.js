const buttonAdd = document.querySelector('#buttonAdd');
const bookForm = document.querySelector('#bookForm');
const darkOverlay = document.querySelector('#darkOverlay');

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
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

  bookForm.reset(); // Reset the form fields
  hideForm();
}

function showForm() {
  bookForm.classList.remove('hidden');
  darkOverlay.classList.remove('hidden');
}

function hideForm() {
  bookForm.classList.add('hidden');
  darkOverlay.classList.add('hidden');
}

function removeBook(event) {
  const button = event.target;
  const bookIndex = parseInt(button.getAttribute('data-index'));

  myLibrary.splice(bookIndex, 1);
  displayBook();
}

function changeStatus(event) {
  const button = event.target;
  const bookIndex = parseInt(button.getAttribute('data-index'));
  const book = myLibrary[bookIndex];

  book.read = !book.read; // Toggle read property

  button.textContent = button.textContent === 'Read' ? 'Not read' : 'Read';
}

function changeColor(event) {
  const button = event.target;;
  const bookIndex = parseInt(button.getAttribute('data-index'));
  const book = myLibrary[bookIndex];

  button.classList.toggle('not-read-color');
  button.classList.toggle('read-color');
}

function displayBook() {
  const library = document.querySelector('#library');
  library.innerHTML = ''; // Clear existing content before re-rendering

  myLibrary.forEach((book, index) => {
    const div = document.createElement('div');
    const buttonDelete = document.createElement('button');
    const buttonRead = document.createElement('button');

    div.classList.toggle('grid-item');
    buttonRead.classList.add('button-action', 'not-read-color');
    buttonDelete.classList.toggle('button-action');

    buttonDelete.textContent = 'Remove';
    buttonRead.textContent = 'Not read';

    buttonDelete.setAttribute('data-index', index);
    buttonRead.setAttribute('data-index', index);

    buttonDelete.addEventListener('click', removeBook);
    buttonRead.addEventListener('click', changeStatus);
    buttonRead.addEventListener('click', changeColor);

    for (const [key, value] of Object.entries(book)) {
      if (key !== 'read') {
        const p = document.createElement('p');

        if (key === 'title') {
          p.textContent = `"${value}"`;
        } else if (key === 'pages') {
          p.textContent = `${value} pages`;
        } else {
          p.textContent = `${value}`;
        }

        div.appendChild(p);
      }
    }

    div.appendChild(buttonRead);
    div.appendChild(buttonDelete);
    library.appendChild(div);
  });
}

buttonAdd.addEventListener('click', showForm);
darkOverlay.addEventListener('click', hideForm)
bookForm.addEventListener('submit', addBookToLibrary);