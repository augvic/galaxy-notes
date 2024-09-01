//==================================================\\

// ~~ Function main
function main() {

    // ~~ Getting books from API.
    fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(data => {

            // ~~ Creating a button for each book.
            data.forEach(book => {
                const input = setElement('input', 'button', 'books-class', null, book.name)
                booksContainer.appendChild(input)

                // ~~ Event listener to book click.
                input.addEventListener('click', () => {

                    // ~~ Hide another views and set notePreviewDisplay to true.
                    showDisplay(notePreviewDisplay)

                    // ~~ Change title to book name.
                    document.getElementById('book-name').innerHTML = book.name

                    // ~~ Getting notes from API.
                    fetch(`http://localhost:3000/notes/${book.name}`)
                        .then(response => response.json())
                        .then(notes => {

                            // ~~ Clear notePreviewDisplay for each click in a new book.
                            notePreviewDisplay.innerHTML = ''

                            // ~~ Creating a preview div for each note.
                            notes.forEach(note => {
                                const notePreview = setElement('div', null, 'notes', null, note.name, note.name)
                                notePreviewDisplay.appendChild(notePreview)

                                // ~~ Event listener to notePreview click.
                                notePreview.addEventListener('click', () => {

                                    // ~~ Change title to book name / note name.
                                    document.getElementById('book-name').innerHTML = book.name + ' / ' + note.name

                                    // ~~ Hide another views and set noteFullView to true.
                                    showDisplay(noteFullView)

                                    // ~~ Clear elements at each click.
                                    noteFullView.innerHTML = ''

                                    // ~~ Create note title element.
                                    const noteTitle = setElement('input', 'text', null, 'note-title', note.name, null)
                                    noteFullView.appendChild(noteTitle)

                                    // ~~ Create note text editor elements.
                                    const noteBody = setElement('div', null, null, 'note-body', null, null)
                                    noteFullView.appendChild(noteBody)
                                    const toolBar = setToolBar()
                                    noteBody.appendChild(toolBar)
                                    const textArea = setElement('div', null, null, 'text-area', null, note.text, true, 'indent')
                                    noteBody.appendChild(textArea)
                                    textArea.focus()
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

// ~~ Function to create HTML element.
function setElement(element, type = null, className = null, id = null, value = null, inner = null, editable = false, commandToExec = null) {
    const elementHTML = document.createElement(element)
    if (type !== null) {
        elementHTML.type = type 
    }
    if (className !== null) {
        elementHTML.className = className
    }
    if (id !== null) {
        elementHTML.id = id
    }
    if (value !== null) {
        elementHTML.value = value
    }
    if (inner !== null) {
        elementHTML.innerHTML = inner
    }
    if (editable == true) {
        elementHTML.contentEditable = true
    }
    if (commandToExec !== null) {
        if (commandToExec == 'bold' || commandToExec == 'italic' || commandToExec == 'underline') {
            elementHTML.addEventListener('click', () => {
                document.execCommand(commandToExec)
                const isActive = document.queryCommandState(commandToExec)
                if (isActive) {
                    elementHTML.style.backgroundColor = 'rgb(140, 136, 165)'
                } else {
                    elementHTML.style.backgroundColor = 'rgb(91, 89, 107)'
                }
                textArea = document.getElementById('text-area')
                textArea.focus()
            })
            elementHTML.addEventListener('mouseover', () => {
                if (!document.queryCommandState(commandToExec)) {
                    elementHTML.style.backgroundColor = 'rgb(140, 136, 165)'
                } else {
                    elementHTML.style.backgroundColor = 'rgb(91, 89, 107)'
                }
            })
            elementHTML.addEventListener('mouseout', () => {
                if (!document.queryCommandState(commandToExec)) {
                    elementHTML.style.backgroundColor = 'rgb(91, 89, 107)'
                } else {
                    elementHTML.style.backgroundColor = 'rgb(140, 136, 165)'
                }
            })
        }
        if (commandToExec == 'indent' || commandToExec == 'outdent') {
            elementHTML.addEventListener('keydown', function(event) {
                if (event.key === 'Tab') {
                    event.preventDefault()
                    if (event.shiftKey) {
                        document.execCommand('outdent')
                    } else {
                        document.execCommand('indent')
                    }
                }
            })
        } 
        if (commandToExec == 'fontSize') {
            elementHTML.addEventListener('change', function() {
                const selectedSize = this.value
                document.execCommand('fontSize', false, selectedSize)
                textArea = document.getElementById('text-area')
                textArea.focus()
            })
        }
    }
    return elementHTML
}

//==================================================\\

// ~~ Function to show a specific display.
function showDisplay(displayName) {
    welcome.style.display = 'none'
    noteFullView.style.display = 'none'
    notePreviewDisplay.style.display = 'none'
    display.style.display = 'flex'
    displayName.style.display = 'flex'
}

//==================================================\\

// ~~ Function to create toolbar.
function setToolBar() {

    // ~~ Base.
    const base = setElement('div', null, null, 'tool-bar', null, null, null)

    // ~~ Bold button.
    const buttonBold = setElement('button', null, 'tool-bar-buttons', null, null, 'N', null, 'bold')
    base.appendChild(buttonBold)

    // ~~ Italic button.
    const buttonItalic = setElement('button', null, 'tool-bar-buttons', null, null, 'I', null, 'italic')
    base.appendChild(buttonItalic)

    // ~~ Underline button.
    const buttonUnderline = setElement('button', null, 'tool-bar-buttons', null, null, 'S', null, 'underline')
    base.appendChild(buttonUnderline)

    // ~~ Size.
    const buttonSize = setElement('select', null, 'tool-bar-buttons', null, null, 'S', null, 'fontSize')
    const sizes = ['', 1, 2, 3, 4, 5, 6, 7]
    sizes.forEach(size => {
        const option = setElement('option', null, null, null, size, size, null, null)
        buttonSize.appendChild(option)
    })
    base.appendChild(buttonSize)

    // ~~ Return.
    return base
}

//==================================================\\

// ~~ Elements.
const notePreviewDisplay = document.getElementById('notes-preview-display')
const noteFullView = document.getElementById('notes-full-view')
const booksContainer = document.getElementById('books-view')
const display = document.getElementById('book-display')
const welcome = document.getElementById('welcome')

//==================================================\\

// ~~ Starting listeners.
document.addEventListener('DOMContentLoaded', main)

//==================================================\\