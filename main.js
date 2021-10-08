const { app, BrowserWindow, Menu, globalShortcut } = require("electron");
const path = require("path");
const packageJson = require("./package.json");
let win

function createWindow() {
  win = new BrowserWindow({
    width: 1024,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("views/index.html");

  setMainMenu();
}

function setMainMenu() {
  const template = [
    {
      label: "Reload",
      accelerator: "CmdOrCtrl+R",
      click() {
        reload()
      },
    },
    {
      label: "V"+packageJson.version,
    },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));

  globalShortcut.register('F5', reload);
  globalShortcut.register('CommandOrControl+R', reload);

}

function reload(){
  win.reload();
} 

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
