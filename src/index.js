// Imports
var electron = require('electron')
var appIsDev = require('electron-is-dev')
var appLog = require('electron-timber')

var app = electron.app
var appTitle = app.getName()
var appMenu = electron.Menu
var appGlobalShortcut = electron.globalShortcut

// Main App Window
export var mainWindow = void 0

// If the application is quitting
var isQuitting = false

// Main Window
function createMainWindow () {
  var appView = new electron.BrowserWindow({
    title: appTitle, // Window title
    width: 1280, // Window width
    height: 720, // Window height
    backgroundColor: '#37474f', // Background Color
    center: true, // Center app window?
    movable: true, // Is window movable?
    resizable: true, // Is window resizable?
    fullscreenable: true, // Is window fullscreenable?
    maximizable: true, // Is window maximizable?
    autoHideMenuBar: true, // Hide menubar in window on launch
    webPreferences: {
      nodeIntegration: false,
      plugins: true
    }
  })

  appView.loadURL('https://streamlabs.com/dashboard')

  // Loading app from file, log it
  appLog.log('Loading URL')

  // When window is closed, hide window
  appView.on('close', (e) => {
    if (!isQuitting) {
      e.preventDefault()
      if (process.platform === 'darwin') {
        app.hide()
      } else {
        app.quit()
      }
    }
  })
  return appView
}

app.on('ready', () => {
  // When app is ready, log it
  appLog.log('App ready')

  mainWindow = createMainWindow()

  // Setting App menu
  appMenu.setApplicationMenu(require('./menu.js'))

  // If running in developer environment = Open developer tools
  if (appIsDev) {
    mainWindow.openDevTools()
  }

  var appPage = mainWindow.webContents

  appPage.on('dom-ready', () => {
    // When DOM is ready, log it
    appLog.log('DOM ready')

    // MacOS ONLY style fixes
    if (process.platform === 'darwin') {
      // OS detected as darwin, log it
      appLog.log('OS: Darwin (MacOS) | Adding darwin stylesheets')

      // MacOS hide scroll bars
      appPage.insertCSS('::-webkit-scrollbar { display: none!important; }')
    }

    // Show the Main Window
    mainWindow.show()

    // Reload global shortcut (F5)
    appGlobalShortcut.register('F5', () => {
      if (mainWindow.isFocused()) {
        appLog.log('Reloading')
        mainWindow.webContents.reload()
      }
    })

    // Open dev tools global shortcut (CommandOrControl+Shift+I)
    appGlobalShortcut.register('Shift+CommandOrControl+I', () => {
      if (mainWindow.isFocused()) {
        appLog.log('Opening dev tools')
        mainWindow.webContents.openDevTools()
      }
    })

    // Open external links in browser
    appPage.on('new-window', (e, url) => {
      e.preventDefault()
      electron.shell.openExternal(url)
    })
  })
})

app.on('window-all-closed', () => {
  // When all windows closed, log it.
  appLog.log('All windows closed')

  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // Activating window, log it
  appLog.log('Window activiating')

  mainWindow.show()
})

app.on('before-quit', () => {
  // Before app quit, log it
  appLog.log('App is quitting')

  isQuitting = true
})
