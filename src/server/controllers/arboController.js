const fs      = require('fs');
const path    = require('path');

const rootDir = global.config.templatesRootPath;

exports.buildMenu = function(req,res){    
    var buildArbo = function(dir){
        let tempArbo = [];
        fs.readdirSync(dir).forEach(file => { //for each element in dir
            let fullPath = path.resolve(dir, file); //get full path           
            if (fs.statSync(fullPath) && fs.statSync(fullPath).isDirectory()) { //if element is directory
                console.log('+'+file);                
                tempArbo.push({"type":"d","name":file,"children":buildArbo(dir+'/'+file)}); //replay buildArbo on this directory
            } else {    //if element isn't directory
                console.log('-'+file);
                tempArbo.push({"type":"f","name":file});                    
            }  
        })        
        return tempArbo;
    }
    res.send(buildArbo(rootDir));    
}
