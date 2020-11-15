import { app, BrowserWindow } from 'electron';

const createWindow = (): void => {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('index.html');
  if(process.env.NODE_ENV === 'development'){
    win.webContents.openDevTools();
  }
}

app.on('ready', createWindow);