const fs = require('fs');
const path = require('path');

export class UserManager {
    constructor() {
        let folderConfigLauncher = 'VintageStoryLauncher';
        this.applicationData = path.join(process.env.APPDATA, folderConfigLauncher);
    }
    
    defaultFolderCreate() {
        fs.access(this.applicationData, fs.constants.F_OK, (error) => {
            if(error) {
                fs.mkdir(this.applicationData, { recursive: true }, (err) => { if (err) throw err; })
                console.log('sad');
            }
        });
    }
}