var Application = require('spectron').Application
var assert = require('assert')
var electron = require('electron')

var app = new Application({
    path: electron,
    args: ['app']
})

describe('App Testing:', function() {
    this.timeout(10000)

    beforeEach(function() {
        return app.start()
    })

    it('Window Tests', function() {
        app.start().then(function() {
            // Check if the window is visible
            return app.browserWindow.isVisible()
        }).then(function(isVisible) {
            // Verify the window is visible
            assert.equal(isVisible, true)
        }).then(function() {
            // Get the window's title
            return app.client.getTitle()
        }).then(function(title) {
            // Verify the window's title
            assert.equal(title, 'Ionic Creator')
        }).then(function() {
            // Stop the application
            return app.stop()
        }).catch(function(error) {
            // Log any failures
            console.error('Test failed', error.message)
        })
    })

    afterEach(function() {
        if (app && app.isRunning()) {
            return app.stop()
        }
    })
})
