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

        addNewBook() {
            const section = document.querySelector('#library');
            addBookBtn.setAttribute('disabled', true);
            
            // Create a card
            const card = document.create('div');
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
    
        deleteBook(event) {
            const index = event.target.parentElement.parentElement.dataset.index;
            this.myLibrary.splice(index, 1);
            this.clean();
            this.render();
        }
    
        render() {
            const section = document.querySelector('#library');
    
            this.myLibrary.forEach((book, bookIndex) => {

                // Card Container
                const card = helper.createPlusClass('div', 'card');
                card.setAttribute('data-index', `${bookIndex}`);
    
                // Card Header
                const header = helper.createPlusClass('div', 'card-header');
                const title = helper.createPlusTextContent('h2', book.title);
                const author = helper.createPlusTextContent('p', book.author);
            
                // Card Footer
                const footer = helper.createPlusClass('div', 'card-footer');
                const pages = helper.createPlusTextContent('span', `Pages: ${book.pages}`);
                const readLabel = helper.createPlusTextContent('label', book.isRead);
                readLabel.setAttribute('for', `readBtn-${bookIndex}`)
                
                const readBtn = helper.create('input');
                const readBtnAttrs = {
                    type: 'checkbox',
                    id: `readBtn-${bookIndex}`,
                    name: `readBtn-${bookIndex}`,
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
                btnDelete.setAttribute('type', 'button');
                btnDelete.addEventListener('click', this.deleteBook.bind(this));
    
                // Append to DOM
                section.appendChild(card);
                helper.appendChildren(card, [header, footer]);
                helper.appendChildren(header, [title, author]);
                helper.appendChildren(footer, [pages, readLabel, readBtn, btnDelete])
            });
        }
    
        clean() {
            const section = document.querySelector('#library');
            section.replaceChildren();
        }
    
    }

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

    // Create library
    const library = new Library([]);

    const addBookBtn = document.querySelector('#add-book');
    addBookBtn.addEventListener('click', library.addNewBook);
    
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
    
    library.render();

})();    
