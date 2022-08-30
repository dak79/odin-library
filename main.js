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



function displayLibrary (library) {
    const section = document.querySelector('#library');

    library.forEach(book => {
        // Card container
        const card = document.createElement('div');
        section.appendChild(card);

        const title = document.createElement('h2');
        title.textContent = book.title;
        card.appendChild(title);
        const author = document.createElement('p');
        author.textContent = book.author;
        card.appendChild(author);
        const pages = document.createElement('span');
        pages.textContent = `N. of pages: ${book.pages}`;
        card.appendChild(pages);

        const read = document.createElement('span');
        read.textContent = book.alreadyRead ? 'Book already read' : 'Not read yet';
        card.appendChild(read);  
    });
}


/* TEST */
// Create instances and add those to array
const hobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 305, true);
addBookToLibrary(hobbit);

const silmarillon = new Book ('The Silmarillion', 'J.R.R. Tolkien', 405, true);
addBookToLibrary(silmarillon);

const lord = new Book ('The Lord of the Rings', 'J.R.R. Tolkien', 1137, true);
addBookToLibrary(lord);

const fall = new Book ('The Fall of Nùmenor', 'J.R.R. Tolkien', 352, false);
addBookToLibrary(fall);

const unfinished = new Book ('Unfinished Tales', 'J.R.R. Tolkien', 624, true);
addBookToLibrary(unfinished);

const gondolin = new Book ('The Fall of Gondolin', 'J.R.R. Tolkien', 304,
false);
addBookToLibrary(gondolin);

console.log(myLibrary)
displayLibrary(myLibrary);

/*
console.log(b);
console.log(b.info());

addBookToLibrary(b);
console.log(myLibrary);
*/