const libraryApp = (() => {
    
    class Book {
        constructor(title, author, pages, isAlreadyRead) {
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.isAlreadyRead = isAlreadyRead;
        }
    
        get isRead() {
            return this.isAlreadyRead ? 'Book already read' : 'Not read yet';
        }
    
        get info() {
            return `${this.title} by ${this.author}, ${this.pages}, ${this.isRead()}`;
        }
    
        toggleRead() {
            this.isAlreadyRead ? this.isAlreadyRead = false : this.isAlreadyRead = true;
        }
    }
    
    class Library {
        constructor(myLibrary) {
            this.myLibrary = myLibrary;
        }
        
        addBook(book) {
            this.myLibrary.push(book)
        }
        
        saveNewBook() {
            
            // Create a new book instances
            const titleField = document.querySelector('#title').value;
            const authorField = document.querySelector('#author').value;
            const pagesField = document.querySelector('#pages').value;
            const readField = document.querySelector('#read').checked;
            const newBook = new Book(titleField, authorField, pagesField, readField);
        
            this.addBook(newBook);
        }
    
        deleteBook(index) {
            this.myLibrary.splice(index, 1);
        }
    }

    const DOMmanipulation = (() => {
        const renderNewBook = () => {

            const section = document.querySelector('#library');
            const addBookBtn = document.querySelector('#add-book');
            
            // Disable add book btn
            addBookBtn.setAttribute('disabled', true);

            const btnDeletes = document.querySelectorAll('.btn-delete');
            btnDeletes.forEach(btn => btn.setAttribute('disabled', true));
            
            const card = helper.createPlusClass('div', 'card');
            const form = helper.create('form');
            
            const titleLabel = helper.createPlusTextContent('label', 'Title:');
            titleLabel.setAttribute('for', 'title');
            
            const title = document.createElement('input');
            const titleAttrs = {
                type: 'text',
                id: 'title',
                name: 'title'
            }
            helper.setAttributes(title, titleAttrs)
            
            const authorLabel = helper.createPlusTextContent('label', 'Author');
            authorLabel.setAttribute('for', 'author');
            
            const author = helper.create('input');
            const authorAttrs = {
                type: 'text',
                id: 'author',
                name: 'author'
            }
            helper.setAttributes(author, authorAttrs);
            
            const pagesLabel = helper.createPlusTextContent('label', 'Pages:');    
            pagesLabel.setAttribute('for', 'pages');
            
            const pages = helper.create('input');
            const pagesAttrs = {
                type: 'number',
                id: 'pages',
                name: 'pages'
            }
            helper.setAttributes(pages, pagesAttrs);

            const readLabel = helper.createPlusTextContent('label', 'Not read Yet:');
            readLabel.setAttribute('for', 'pages');

            const read = helper.create('input');
            const readAttrs = {
                type: 'checkbox',
                id: 'read',
                name: 'read',
            }
            helper.setAttributes(read, readAttrs);
            read.addEventListener('change', (event) => {
                event.target.checked ? readLabel.textContent = 'Read:' : readLabel.textContent = 'Not Read Yet:';
            })
            
            const btnSave = helper.createPlusTextContent('button', 'Save');
            btnSave.setAttribute('type', 'button');
            btnSave.addEventListener('click', renderSavedBook);
            
            // Append elements to DOM
            section.appendChild(card);
            card.appendChild(form);
            helper.appendChildren(form, [titleLabel, title, authorLabel, author, pagesLabel, pages, readLabel, read, btnSave]);
        }

        const renderSavedBook = () => {
            const addBookBtn = document.querySelector('#add-book');
            
            // Enable add book
            addBookBtn.removeAttribute('disabled');

            // Enable delete buttons
            const btnDeletes = document.querySelectorAll('.btn-delete');
            btnDeletes.forEach(btn => btn.setAttribute('disabled', false));
        
            // Create a new book instances
            const titleField = document.querySelector('#title').value;
            const authorField = document.querySelector('#author').value;
            const pagesField = document.querySelector('#pages').value;
            const readField = document.querySelector('#read').checked;
            const newBook = new Book(titleField, authorField, pagesField, readField);
        
            userLibrary.library.addBook(newBook);
            cleanDisplay();
            renderLibrary(userLibrary.library);
        }

        const renderLibrary = (myLibrary) => {
            const section = document.querySelector('#library');
            
            for (let item of Object.values(myLibrary)) {
                item.forEach((book, index) => {

                    // Card Container
                    const card = helper.createPlusClass('div', 'card');
                    card.setAttribute('data-index', `${index}`);
   
                    // Card Header
                    const header = helper.createPlusClass('div', 'card-header');
                    const title = helper.createPlusTextContent('h2', book.title);
                    const author = helper.createPlusTextContent('p', book.author);
   
                    // Card Footer
                    const footer = helper.createPlusClass('div', 'card-footer');
                    const pages = helper.createPlusTextContent('span', `Pages: ${book.pages}`);
                    const readLabel = helper.createPlusTextContent('label', book.isRead);
                    readLabel.setAttribute('for', `readBtn-${index}`)
                    const readBtn = helper.create('input');
                    const readBtnAttrs = {
                        type: 'checkbox',
                        id: `readBtn-${index}`,
                        name: `readBtn-${index}`,
                    }
                    helper.setAttributes(readBtn, readBtnAttrs)
                           
                    if (book.isAlreadyRead) {
                        readBtn.setAttribute('checked', '');
                    }
                    
                    readBtn.addEventListener('change', () => {
                        book.toggleRead();
                        readLabel.textContent = book.isRead;
                    });
    
                    const btnDelete = helper.createPlusTextContent('button', 'Delete');
                    helper.setAttributes(btnDelete, {
                        type: 'button',
                        class: 'btn-delete',
                        'data-btn':`${index}`
                    });
                    btnDelete.addEventListener('click', deleteBookBtn);
   
                    // Append to DOM
                    section.appendChild(card);
                    helper.appendChildren(card, [header, footer]);
                    helper.appendChildren(header, [title, author]);
                    helper.appendChildren(footer, [pages, readLabel, readBtn, btnDelete])
                })
            }
        }

        function deleteBookBtn(event){
            userLibrary.library.deleteBook(event.target.dataset.btn);
            cleanDisplay();
            renderLibrary(userLibrary.library);
            
            
        }

        const cleanDisplay = () => {
            const section = document.querySelector('#library');
            section.replaceChildren();
        }

        return {
            renderNewBook,
            renderLibrary
        }    
    })();

    const helper = (() => {
    
        const create = element => document.createElement(element);
    
        const createPlusClass = (element, addClass) => {
            let el = document.createElement(element);
            el.classList.add(addClass);
            return el;
        }
    
        const createPlusTextContent = (element, addTextContent) => {
            let el = document.createElement(element);
            el.textContent = addTextContent;
            return el;
        }
    
        const setAttributes = (element, attrs) => Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
        
        const appendChildren = (parent, children) => children.forEach(child => parent.appendChild(child));

        return {
            create,
            createPlusClass,
            createPlusTextContent,
            setAttributes,
            appendChildren
        }
    })();

    const userLibrary = (() => {

        // Event listener for Add Book Btn
        const addBookBtn = document.querySelector('#add-book');
        addBookBtn.addEventListener('click', DOMmanipulation.renderNewBook);
        
        // Create library
        const library = new Library([]);
        
        // Create instances and add those to array
        const hobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 305, true);
        library.addBook(hobbit);
        
        const silmarillon = new Book ('The Silmarillion', 'J.R.R. Tolkien', 405, true);
        library.addBook(silmarillon);
        
        const lord = new Book ('The Lord of the Rings', 'J.R.R. Tolkien', 1137, true);
        library.addBook(lord);
        
        const fall = new Book ('The Fall of Nùmenor', 'J.R.R. Tolkien', 352, false);
        library.addBook(fall);
        
        const unfinished = new Book ('Unfinished Tales', 'J.R.R. Tolkien', 624, true);
        library.addBook(unfinished);
        
        const gondolin = new Book ('The Fall of Gondolin', 'J.R.R. Tolkien', 304,
        false);
        library.addBook(gondolin);

        DOMmanipulation.renderLibrary(library);

        return {
            library
        }
    })();
})();    
