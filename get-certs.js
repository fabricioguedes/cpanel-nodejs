//  Receive valid certificates not cpanel by node js (readdirSync)
//  Shell Comand  ls -1t | head -1
// By Fabrício Guedes

var fs = require('fs'),
    path = require('path');
    _ = require('underscore');
 
    // set cert 
    var domain='namesite' // set name domain 
    var cert = getCert(domain);

function getCert(str) {
   

    const getMostRecentFile = (dir) => {
        const files = orderReccentFiles(dir);
        return files.length ? files[0] : undefined;
    };
    
    const orderReccentFiles = (dir) => {
        return fs.readdirSync(dir)
            .filter(file => fs.lstatSync(path.join(dir, file)).isFile())
            .map(file => ({ file, mtime: fs.lstatSync(path.join(dir, file)).mtime }))
            .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
    };
    var cert = {
        crt: '',
        key: ''
    };
    // patch cert files
    let k=getMostRecentFile('/home/'+str+'/ssl/keys');
    let c=getMostRecentFile('/home/'+str+'/ssl/certs');

    cert.crt =c.file;
    cert.key = k.file;
   
    return cert;
}

console.log(cert);
