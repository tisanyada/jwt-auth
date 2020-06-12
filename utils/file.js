const fs = require('fs');


module.exports = {
    deleteFile: (imagepath) => {
        fs.unlink(imagepath, (err) => {
            if(err) throw err;
        });
    }
}