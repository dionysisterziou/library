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
    displayBook();
}

function displayBook() {
    const library = document.querySelector('#library')

    for (const book of myLibrary) {
        const div = document.createElement('div');

        for (const [key, value] of Object.entries(book)) {
            div.innerHTML += `<p>${value}</p>`;
        }

        library.appendChild(div);
        // console.log(book)
    }
}

buttonAdd.addEventListener('click', addBookToLibrary);