let myLibrary = [];

/**
 * Constructor for objects Book
 * @param {string} title - Book's title
 * @param {string} author - Book's author
 * @param {number} pages - Book's pages 
 * @param {boolean} alreadyRead - Aready read / Not read yet
 */
function Book (title, author, pages, alreadyRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.alreadyRead = alreadyRead;
}

/**
 * Method store in Book's prototype
 * @returns {string} - Information about book
 */
Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.alreadyRead ? 'Book already read' : 'Not read yet'}.`;
}

/**
 * Add a book to library array
 * @param {object} book - store books in myLibrary array 
 */
function addBookToLibrary (book) {
    myLibrary.push(book);
}

/* TEST
const b = new Book('The Hobbit', 'JRRR Tolkien', 345, true);
console.log(b);
console.log(b.info());

addBookToLibrary(b);
console.log(myLibrary);
*/