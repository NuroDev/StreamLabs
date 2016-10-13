const config = require('electron-config');

module.exports = new config({
    defaults: {
        lastWindowState: {
            x: 0,
            y: 0,
            width: 1280,
            height: 720
        }
    }
});
