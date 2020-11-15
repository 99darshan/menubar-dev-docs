import { app, BrowserWindow, Tray, screen, Menu } from 'electron';
import TrayGenerator from '@/electron/TrayGenerator';

// NOTE: declare mainWindow and tray as global variable
// tray will be created out of this mainWindow object
// declaring them inside createWindow will result in tray icon being lost because of garbage collection of mainWindow object
let mainWindow: BrowserWindow;
let tray: Tray;

const createWindow = (): void => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: 1080,
    height: height * 0.8,
    frame: false,
    show: false,
    fullscreenable: false,
    resizable: true,
    alwaysOnTop: false
  });

  mainWindow.loadURL('http://devdocs.io/');
}

app.on('ready', ()=>{
  const menu = Menu.buildFromTemplate([{
    label: 'Quit',
    submenu: [{role: 'quit'}]
  }]);
  Menu.setApplicationMenu(menu);
  createWindow();
  const trayGenerator: TrayGenerator = new TrayGenerator(mainWindow, 'assets/IconTemplate.png');
  tray = trayGenerator.tray;
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.dock.hide();