const {app, BrowserWindow} = require('electron');

// To avoid being garbage collected
let mainWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({width: 800, height: 600});

    mainWindow.on('closed', function () {
        mainWindow = null
    });

    if (process.argv[3] === 'dev') {
        mainWindow.loadURL('http://localhost:8080');
        
        return;
    }
    
    mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
});

app.on('window-all-closed', () => {
    app.quit();
});
