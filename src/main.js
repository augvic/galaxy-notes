//==================================================\\

// ~~ Requires.
const {app, BrowserWindow} = require('electron');
const path = require('path');

//==================================================\\

// ~~ Function to create the window.
function create_window() {

    const mainwindow = new BrowserWindow({
        width: 1280,
        height: 720,
        icon: path.join('./assets/icon.png')
    });
    mainwindow.loadFile('./main-window/index.html');
    mainwindow.setMenuBarVisibility(false);
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