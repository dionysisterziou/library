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

  myLibrary.forEach((book) => {
    const div = document.createElement('div')

    for (const value of Object.values(book)) {
      const p = document.createElement('p')

      p.textContent = `${value}`;
      div.appendChild(p);
    }
    
    library.appendChild(div)
  })

  myLibrary.length = []
}

bookForm.addEventListener('submit', addBookToLibrary)
