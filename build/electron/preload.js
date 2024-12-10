"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
var electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    selectFolder: function () { return electron_1.ipcRenderer.invoke('select-folder'); },
    loadFiles: function (folderPath) { return electron_1.ipcRenderer.invoke('load-media-files', folderPath); },
});
//# sourceMappingURL=preload.js.map