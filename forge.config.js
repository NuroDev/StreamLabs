module.exports = {
  make_targets: {
    win32: ['squirrel', 'zip'],
    darwin: ['dmg', 'zip']
  },
  electronPackagerConfig: {
    packageManager: 'yarn',
    asar: true,
    icon: './build/streamlabs-icon.png'
  },
  electronWinstallerConfig: {
    name: 'Streamlabs',
    setupIcon: './build/streamlabs-icon.ico',
    loadingGif: './build/install-spinner.gif'
  },
  electronInstallerDMG: {
    background: './build/background.png',
    icon: './build/streamlabs-icon.icns',
    overwrite: true
  },
  github_repository: {
    owner: 'nurodev',
    name: 'streamlabs'
  }
}
