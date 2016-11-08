//Electron
const electron = require('electron');
const globalShortcut = electron.globalShortcut;
const browserWindow = electron.BrowserWindow;
const menu = electron.Menu;

//App Info
const app = electron.app;
const app_name = app.getName();
const app_title = app.getName();
const app_version = app.getVersion();
const app_description = 'The unofficial electron app for StreamLabs';
const app_config = require('./lib/config.js');
const app_is_dev = require('electron-is-dev');

// System paths
const path = require('path');
const fs = require('fs');

// Electron DL
require('electron-dl')();

// Right Click/Context menu contents
require('electron-context-menu')();

// Main App Window
let mainWindow;

// If the application is quitting
let isQuitting = false;

// Main Window
function createMainWindow() {
    const lastWindowState = app_config.get('lastWindowState');
    const app_view = new electron.BrowserWindow({
        title: app_title,
        x: lastWindowState.x,
        y: lastWindowState.y,
        width: lastWindowState.width,
        height: lastWindowState.height,
        center: true,
        movable: true,
        resizable: true,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            plugins: true
        }
    });
    app_view.loadURL('https://streamlabs.com/dashboard');

    // When window is closed, hide window
    app_view.on('close', e => {
        if (!isQuitting) {
            e.preventDefault();
            if (process.platform === 'darwin') {
                app.hide();
            } else {
                app.quit();
            }
        }

    });
    return app_view;
}

app.on('ready', () => {
    mainWindow = createMainWindow();

    // Setting App menu
    menu.setApplicationMenu(require('./lib/menu.js'));

    // If running in developer environment = Open developer tools
    if (app_is_dev) { mainWindow.openDevTools() }

    const app_page = mainWindow.webContents;

    app_page.on('dom-ready', () => {

        // Global Style Additions
        app_page.insertCSS(fs.readFileSync(path.join(__dirname, 'app.css'), 'utf8'));

        // Show the Main Window
        mainWindow.show();

        // Open external links in browser
        app_page.on('new-window', (e, url) => {
            e.preventDefault();
            electron.shell.openExternal(url);
        });

        // Shortcut to reload the page.
        globalShortcut.register('CmdOrCtrl+R', (item, focusedWindow) => {
            if (focusedWindow) {
                mainWindow.webContents.reload();
            }
        });
        // Shortcut to go back a page.
        globalShortcut.register('Command+Left', (item, focusedWindow) => {
            if (focusedWindow && focusedWindow.webContents.canGoBack()) {
                focusedWindow.webContents.goBack();
                focusedWindow.webContents.reload();
            }
        });

        // Navigate the window back when the user hits their mouse back button
        mainWindow.on('app-command', (e, cmd) => {
            if (cmd === 'browser-backward' && mainWindow.webContents.canGoBack()) {
                mainWindow.webContents.goBack();
            }
        });
    })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    mainWindow.show();
});

app.on('before-quit', () => {
    isQuitting = true;

    // Saves the current window position and window size to the config file.
    if (!mainWindow.isFullScreen()) {
        app_config.set('lastWindowState', mainWindow.getBounds());
    }
});
