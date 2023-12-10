class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  add(book) {
    this.books.push(book);
  }

  remove(index) {
    this.books.splice(index, 1);
  }

  toggleReadStatus(index) {
    this.books[index].read = !this.books[index].read;
  }
}

class UI {
  static displayBook() {
    const library = document.querySelector('#library');
    library.innerHTML = ''; // Clear existing content before re-rendering

    myLibrary.books.forEach((book, index) => {
      const div = document.createElement('div');
      const buttonRead = document.createElement('button');
      const buttonDelete = document.createElement('button');

      buttonRead.setAttribute('data-index', index);
      buttonDelete.setAttribute('data-index', index);

      div.classList.toggle('grid-item');

      UI.checkReadButton(book, buttonRead);

      buttonRead.classList.add('button-action');
      buttonDelete.classList.toggle('button-action');
      buttonDelete.textContent = 'Remove';
      buttonDelete.addEventListener('click', UI.removeBook);
      buttonRead.addEventListener('click', UI.changeStatus);
      buttonRead.addEventListener('click', UI.changeColor);

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

  static removeBook(event) {
    const button = event.target;
    const bookIndex = parseInt(button.getAttribute('data-index'));

    myLibrary.remove(bookIndex, 1);
    UI.displayBook();
  }

  static changeStatus(event) {
    const button = event.target;
    const bookIndex = parseInt(button.getAttribute('data-index'));

    myLibrary.toggleReadStatus(bookIndex);
    UI.displayBook();
  }

  static changeColor(event) {
    const button = event.target;;

    button.classList.toggle('not-read-color');
    button.classList.toggle('read-color');
  }

  static checkReadButton(book, buttonRead) {
    if (book.read) {
      buttonRead.textContent = 'Read';
      buttonRead.classList.add('read-color');
    } else {
      buttonRead.textContent = 'Not read'
      buttonRead.classList.add('not-read-color');
    }
  }
}

class Form {
  static addBookToLibrary(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="title"]').value;
    const author = document.querySelector('input[name="author"]').value;
    const pages = parseInt(document.querySelector('input[name="pages"]').value, 10);
    const read = false;

    const book = new Book(title, author, pages, read);

    myLibrary.add(book);
    UI.displayBook();
    Form.hideForm();
    bookForm.reset(); // Reset the form fields
  }

  static showForm() {
    bookForm.classList.remove('hidden');
    darkOverlay.classList.remove('hidden');
  }


  static hideForm() {
    bookForm.classList.add('hidden');
    darkOverlay.classList.add('hidden');
  }
}

const buttonAdd = document.querySelector('#buttonAdd');
const bookForm = document.querySelector('#bookForm');
const darkOverlay = document.querySelector('#darkOverlay');
const myLibrary = new Library();

buttonAdd.addEventListener('click', Form.showForm);
darkOverlay.addEventListener('click', Form.hideForm)
bookForm.addEventListener('submit', Form.addBookToLibrary);