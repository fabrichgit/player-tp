import { app, BrowserWindow } from 'electron';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Charge votre application React en mode développement ou depuis le build
  mainWindow.loadURL('http://localhost:5173');  // En développement
  // Pour la version produite : mainWindow.loadFile(path.join(__dirname, 'build/index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
