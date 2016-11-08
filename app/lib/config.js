const config = require('electron-config');

module.exports = new config({
    defaults: {
        lastWindowState: {
            // Default window width/height.
            // Use "x:" or "y:" to set the default position.
            width: 1280,
            height: 720
        }
    }
});
