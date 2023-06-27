const { app, BrowserWindow, Menu } = require('electron')
const path = require("path")

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      icon: path.join(__dirname, "apple.png")
    })

    Menu.setApplicationMenu(null)

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    if (process.platform == 'darwin') {
      app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      })
    }
  })
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})