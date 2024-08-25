//==================================================\\

// ~~ Function to set book to visible.
const books = document.querySelectorAll('.books-class');
const display = document.getElementById('book-display');
books.forEach(book => {
    book.addEventListener('click', () => {
        display.style.display = 'flex';
        const bookname = book.getAttribute('value');
        document.getElementById('book-name').innerText = bookname;
    });
});

//==================================================\\