module.exports = function loadAHK(mod) {
    // imports
    const fs = require('fs');
    const path = require('path');
    const child = require('child_process').execFile;

    // floating vars
    let ahkProcess;

    // load AHK process
    mod.hook('S_LOGIN', 'event', () => {
        const executablePath = path.join(__dirname, "scripts", `${mod.game.me.class}.exe`);

        if (fs.existsSync(executablePath))
            ahkProcess = child(executablePath);
    });

    // kill AHK process
    mod.hook('S_GET_USER_LIST', 'event', () => { if (ahkProcess) ahkProcess.kill() });
    this.destructor = () => { if (ahkProcess) ahkProcess.kill() };
}