//==================================================\\

// ~~ Requires.
const {app, BrowserWindow} = require('electron');
const path = require('path');

//==================================================\\

// ~~ Function to create the window.
function create_window() {

    const mainwindow = new BrowserWindow({
        width: 800,
        height: 600
    });
    mainwindow.loadFile('index.html');
}

//==================================================\\

// Starting app.
app.whenReady().then(() => {
    create_window();
});

//==================================================\\

// Exiting application.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

//==================================================\\