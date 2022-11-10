const buttonAdd = document.querySelector('#buttonAdd');

let myLibrary = [];

function Book(title, author, pages) {
    this.title = title
    this.author = author
    this.pages = pages
}

function addBookToLibrary(event) {
    event.preventDefault();

    let title = document.querySelector('input[name="title"]').value;
    let author = document.querySelector('input[name="author"]').value;
    let pages = document.querySelector('input[name="pages"]').value;

    const book = new Book(title, author, pages);

    myLibrary.push(book);
}

buttonAdd.addEventListener('click', addBookToLibrary);