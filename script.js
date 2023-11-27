const buttonAdd = document.querySelector('#buttonAdd');
const bookForm = document.querySelector('#bookForm');
const darkOverlay = document.querySelector('#darkOverlay');

class Book {
  constructor(title, author, pages, read) {
    this._title = title;
    this._author = author;
    this._pages = pages;
    this._read = read;
  }

  // Getter and setter for title
  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
  }

  // Getter and setter for author
  get author() {
    return this._author;
  }

  set author(author) {
    this._author = author;
  }

  // Getter and setter for pages
  get pages() {
    return this._pages;
  }

  set pages(pages) {
    this._pages = pages;
  }

  // Getter and setter for read
  get read() {
    return this._read;
  }

  set read(read) {
    this._read = read;
  }
}

const myLibrary = [];

function addBookToLibrary(event) {
  event.preventDefault();

  console.log(event);

  const title = document.querySelector('input[name="title"]').value;
  const author = document.querySelector('input[name="author"]').value;
  const pages = document.querySelector('input[name="pages"]').value;
  const read = false;

  const book = new Book(title, author, pages, read);

  myLibrary.push(book);
  displayBook();
  hideForm();
  bookForm.reset(); // Reset the form fields
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

function checkReadButton(book, buttonRead) {
  if (book.read) {
    buttonRead.textContent = 'Read';
    buttonRead.classList.add('read-color');
  } else {
    buttonRead.textContent = 'Not read'
    buttonRead.classList.add('not-read-color');
  }
}

function checkReadCheckbox() {

}

function displayBook() {
  const library = document.querySelector('#library');
  library.innerHTML = ''; // Clear existing content before re-rendering

  myLibrary.forEach((book, index) => {
    const div = document.createElement('div');
    const buttonRead = document.createElement('button');
    const buttonDelete = document.createElement('button');

    buttonRead.setAttribute('data-index', index);
    buttonDelete.setAttribute('data-index', index);

    div.classList.toggle('grid-item');

    checkReadButton(book, buttonRead);

    buttonRead.classList.add('button-action');
    buttonDelete.classList.toggle('button-action');

    buttonDelete.textContent = 'Remove';

    buttonDelete.addEventListener('click', removeBook);
    buttonRead.addEventListener('click', changeStatus);
    buttonRead.addEventListener('click', changeColor);

    for (const [key, value] of Object.entries(book)) {
      if (key !== '_read') {
        const p = document.createElement('p');

        if (key === '_title') {
          p.textContent = `"${value}"`;
        } else if (key === '_pages') {
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