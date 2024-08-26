//==================================================\\

// ~~ Elements.
const notepreviewdisplay = document.getElementById('notes-preview-display')
const notefullview = document.getElementById('notes-full-view')
const bookscontainer = document.getElementById('books')
const display = document.getElementById('book-display')

//==================================================\\

// ~~ Function to set book to visible.
function getDataApi() {

    // ~~ Getting books from API.
    fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(data => {
            data.forEach(book => {
                const input = document.createElement('input')
                input.type = 'button'
                input.value = book.name
                input.className = 'books-class'
                bookscontainer.appendChild(input)

                // ~~ Event listener to book click.
                input.addEventListener('click', () => {
                    notefullview.style.display = 'none'
                    display.style.display = 'flex'
                    notepreviewdisplay.style.display = 'flex'
                    document.getElementById('book-name').innerHTML = book.name
                    fetch(`http://localhost:3000/notes/${book.name}`)
                        .then(response => response.json())
                        .then(notes => {
                            notepreviewdisplay.innerHTML = ''
                            notes.forEach(note => {
                                const notepreview = document.createElement('div')
                                notepreview.className = 'notes'
                                notepreview.value = `${note.name}`
                                notepreview.innerHTML = `${note.name}`
                                notepreviewdisplay.appendChild(notepreview)

                                // ~~ Event listener to note click.
                                notepreview.addEventListener('click', () => {
                                    document.getElementById('book-name').innerHTML = book.name + ' / ' + note.name
                                    notepreviewdisplay.style.display = 'none'
                                    notefullview.style.display = 'flex'
                                    notefullview.innerHTML = ''
                                    const notetitle = document.createElement('input')
                                    notetitle.type = 'text'
                                    notetitle.id = 'note-title'
                                    notetitle.value = `${note.name}`
                                    const notebody = document.createElement('textarea')
                                    notebody.id = 'textarea'
                                    notebody.innerHTML = `${note.text}`
                                    notefullview.appendChild(notetitle)
                                    notefullview.appendChild(notebody)
                                })
                            })
                        })
                        .catch(error => console.error('Erro ao buscar notas: ', error))
                })
            })
        })
        .catch(error => console.error('Erro ao buscar cadernos: ', error))
}

//==================================================\\

// ~~ Starting listeners.
document.addEventListener('DOMContentLoaded', getDataApi)

//==================================================\\