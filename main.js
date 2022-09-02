// Book database
const myLibrary = [];

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

Book.prototype.toggleRead = function () {
    this.alreadyRead ? this.alreadyRead = false : this.alreadyRead = true;
}
/**
 * Add a book to library array
 * @param {object} book - store books in myLibrary array 
 */
function addBookToLibrary (book) {
    myLibrary.push(book);

}

/**
 * Display books on web page
 * @param {array} library - array with all books stored 
 */
function displayLibrary (library) {
    const section = document.querySelector('#library');

    library.forEach(book => {

        // Card container
        const card = document.createElement('div');
        
        // Set data-attribute = array index for each book 
        const index = library.indexOf(book)
        card.setAttribute('data-index', `${index}`);
        
        card.classList.add('card');
        section.appendChild(card);

        const header = document.createElement('div');
        header.classList.add('card-header');
        card.appendChild(header);

        // Book's title
        const title = document.createElement('h2');
        title.textContent = book.title;
        header.appendChild(title);
        
        // Book's author
        const author = document.createElement('p');
        author.textContent = book.author;
        header.appendChild(author);

        const footer = document.createElement('div');
        footer.classList.add('card-footer');
        card.appendChild(footer)

        // Book's number of pages
        const pages = document.createElement('span');
        pages.textContent = `Pages: ${book.pages}`;
        footer.appendChild(pages);

        // Already read or not: initial value
        const readLabel = document.createElement('label');
        readLabel.setAttribute('for', 'readBtn')
        readLabel.textContent = book.alreadyRead ? 'Book already read' : 'Not read yet';
        footer.appendChild(readLabel);  

        // Slide button
        const readBtn = document.createElement('input');
        const readBtnAttrs = {
        type: 'checkbox',
        id: 'readBtn',
        name: 'readBtn',
        }

        setAttributes(readBtn, readBtnAttrs)

        // Initial value slide
        if (book.alreadyRead) {
            readBtn.setAttribute('checked', '');
        }

        footer.appendChild(readBtn);

        // Change status read / not read
        const readBtnBind = book.toggleRead.bind(book)
        readBtn.addEventListener('change', () => {
            
            // Change value in the book object
            readBtnBind();

            // Change label
            readLabel.textContent = book.alreadyRead ? 'Book already read' : 'Not read yet';
        });

        // Button delete
        const btnDelete = document.createElement('button');
        btnDelete.setAttribute('type', 'button');
        btnDelete.textContent = 'Delete';
        btnDelete.addEventListener('click', deleteBook);
        footer.appendChild(btnDelete);
    });
}

// Listenern to new book button
const addBookBtn = document.querySelector('#add-book');
addBookBtn.addEventListener('click', addNewBook);

/**
 * Add new book to library
 */
function addNewBook () {
    const section = document.querySelector('#library');

    // Disable add new book button
    addBookBtn.setAttribute('disabled', true);
    
    // Create a card and add to libary
    const card = document.createElement('div');
    card.classList.add('card');
    section.appendChild(card);

    // Create form tag
    const form = document.createElement('form');
    card.appendChild(form);

    // Book's title
    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'title');
    titleLabel.textContent = 'Title:';
    form.appendChild(titleLabel);
    
    const title = document.createElement('input');
    const titleAttrs = {
        type: 'text',
        id: 'title',
        name: 'title'
    }
    setAttributes(title, titleAttrs)
    form.appendChild(title);

    // Book's author
    const authorLabel = document.createElement('label');
    authorLabel.setAttribute('for', 'author');
    authorLabel.textContent = 'Author:';
    form.appendChild(authorLabel);
    
    const author = document.createElement('input');
    const authorAttrs = {
        type: 'text',
        id: 'author',
        name: 'author'
    }
    setAttributes(author, authorAttrs);
    form.appendChild(author);
    
    // Book's number of pages
    const pagesLabel = document.createElement('label');    
    pagesLabel.setAttribute('for', 'pages');
    pagesLabel.textContent = 'Pages:';
    form.appendChild(pagesLabel);
    
    const pages = document.createElement('input');
    const pagesAttrs = {
        type: 'number',
        id: 'pages',
        name: 'pages'
    }
    setAttributes(pages, pagesAttrs);
    form.appendChild(pages);
    
    // Already read or not
    const readLabel = document.createElement('label');
    readLabel.setAttribute('for', 'pages');
    readLabel.textContent = 'Not Read Yet:'
    form.appendChild(readLabel);
    
    const read = document.createElement('input');
    const readAttrs = {
        type: 'checkbox',
        id: 'read',
        name: 'read',
    }
    setAttributes(read, readAttrs);
    form.appendChild(read);
    
    // Change the label according to checkbox value  
    read.addEventListener('change', (event) => {
        event.target.checked ? readLabel.textContent = 'Read:' : readLabel.textContent = 'Not Read Yet:';
    })

    // Save button
    const btnSave = document.createElement('button');
    btnSave.setAttribute('type', 'button');
    btnSave.textContent = 'Save';
    form.appendChild(btnSave);
    
    btnSave.addEventListener('click', () => {
        
        // Enable add new button again
        addBookBtn.removeAttribute('disabled');
        
        // Create a new book instances
        const titleField = document.querySelector('#title').value;
        const authorField = document.querySelector('#author').value;
        const pagesField = document.querySelector('#pages').value;
        const readField = document.querySelector('#read').checked;
        const newBook = new Book(titleField, authorField, pagesField, readField);
        
        // Add new book insances to array
        addBookToLibrary(newBook);

        // Clean library
        cleanDisplay();

        // Display updated library
        displayLibrary(myLibrary);
    });
}

/**
 * Clear the library display
 */
function cleanDisplay() {
    const section = document.querySelector('#library');
    section.innerHTML = '';
}

function deleteBook(event) {

    // Get the book index
    const index = event.target.parentElement.parentElement.dataset.index;
    
    // Cancel book
    myLibrary.splice(index, 1);

    // Clean library
    cleanDisplay();

    // Display updated library
    displayLibrary(myLibrary);
}

// Helper for assign multiple attribute to an element
function setAttributes(element, attrs) {
    for (let key in attrs) {
        element.setAttribute(key, attrs[key]);
    }
}

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


displayLibrary(myLibrary);
