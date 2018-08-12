const {app, BrowserWindow} = require('electron');

// To avoid being garbage collected
let mainWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({width: 800, height: 600});

    if (process.env.ELECTRON_ENV === 'dev') {
        mainWindow.loadURL('http://localhost:8080');
        
        return;
    }
    
    mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
});
