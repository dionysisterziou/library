const bookForm = document.querySelector('#bookForm')

const myLibrary = []

function Book (title, author, pages) {
  this.title = title
  this.author = author
  this.pages = pages
}

function addBookToLibrary (event) {
  event.preventDefault()

  const title = document.querySelector('input[name="title"]').value
  const author = document.querySelector('input[name="author"]').value
  const pages = document.querySelector('input[name="pages"]').value

  const book = new Book(title, author, pages)

  myLibrary.push(book)
  displayBook()
}

function displayBook () {
  const library = document.querySelector('#library')

  for (const book of myLibrary) {
    const div = document.createElement('div')

    for (const [key, value] of Object.entries(book)) {
      div.innerHTML += `<p>${value}</p>`
    }

    library.appendChild(div)
  }

  myLibrary.length = []
}

bookForm.addEventListener('submit', addBookToLibrary)
