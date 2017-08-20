// Electron
const electron = require('electron')

const app = electron.app
const appTitle = 'StreamLabs'
const appVersion = app.getVersion()
const appMenu = electron.Menu

// File menu for Windows platform
const win32Template = {
  label: 'File',
  submenu: [{
    label: 'Hide ' + appTitle,
    accelerator: 'Control+H',
    role: 'hide'
  }, {
    type: 'separator'
  }, {
    label: 'Quit',
    accelerator: 'Control+W',
    role: 'close'
  }]
}

// Application menu for Windows platform
const macOSTemplate = {
  label: 'Application',
  submenu: [{
    label: 'Hide ' + appTitle,
    accelerator: 'Command+H',
    role: 'hide'
  }, {
    type: 'separator'
  }, {
    label: 'Quit',
    accelerator: 'Command+Q',
    click () {
      app.quit()
    }
  }]
}

// Sets first menu item depending on operating system
function menuSet () {
  if (process.platform === 'darwin') {
    return macOSTemplate
  } else {
    return win32Template
  }
}

// Base menu template
const menuTemplate = [
  menuSet(),
  {
    label: 'Edit',
    submenu: [{
      label: 'Undo',
      accelerator: 'CommandOrControl+Z',
      role: 'undo'
    }, {
      label: 'Redo',
      accelerator: 'Shift+CommandOrControl+Z',
      role: 'redo'
    }, {
      type: 'separator'
    }, {
      label: 'Cut',
      accelerator: 'CommandOrControl+X',
      role: 'cut'
    }, {
      label: 'Copy',
      accelerator: 'CommandOrControl+C',
      role: 'copy'
    }, {
      label: 'Paste',
      accelerator: 'CommandOrControl+V',
      role: 'paste'
    }, {
      label: 'Select All',
      accelerator: 'CommandOrControl+A',
      role: 'selectall'
    }]
  }, {
    label: 'View',
    submenu: [{
      label: 'Forward',
      accelerator: 'CommandOrControl+Right',
      click (item, focusedWindow) {
        if (focusedWindow && focusedWindow.webContents.canGoForward()) {
          focusedWindow.webContents.goForward()
        }
      }
    }, {
      label: 'Back',
      accelerator: 'CommandOrControl+Left',
      click (item, focusedWindow) {
        if (focusedWindow && focusedWindow.webContents.canGoBack()) {
          focusedWindow.webContents.goBack()
        }
      }
    }, {
      type: 'separator'
    }, {
      label: 'Refresh',
      accelerator: 'CommandOrControl+R',
      role: 'reload'
    }, {
      label: 'Force Refresh',
      accelerator: 'Shift+CommandOrControl+R',
      role: 'forcereload'
    }]
  }, {
    label: 'Window',
    role: 'window',
    submenu: [{
      label: 'Minimize',
      accelerator: 'CommandOrControl+M',
      role: 'minimize'
    }, {
      label: 'Close',
      accelerator: 'CommandOrControl+W',
      role: 'close'
    }]
  }, {
    label: 'Help',
    role: 'help',
    submenu: [{
      label: 'About ' + appTitle,
      click () {
        electron.shell.openExternal('https://github.com/Meadowcottage/streamlabs/releases/tag/' + appVersion)
      }
    }, {
      label: 'Version ' + appVersion,
      enabled: false
    }, {
      type: 'separator'
    }, {
      label: 'View ' + appTitle,
      click () {
        electron.shell.openExternal('http://streamlabs.com')
      }
    }, {
      type: 'separator'
    }, {
      label: 'Changelog',
      click () {
        electron.shell.openExternal('https://github.com/Meadowcottage/streamlabs/releases/tag/' + appVersion)
      }
    }]
  }]

// Exports menu
module.exports = appMenu.buildFromTemplate(menuTemplate)
