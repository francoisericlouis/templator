const fs = require("fs");
const path = require("path");

const rootDir = global.config.templatesRootPath;
let generatedFile = "";

exports.getContent = function(req, res) {
  let fullPath = path.resolve(rootDir, req.params[0]);
  let fileContent = "";

  fileContent = fs.readFileSync(fullPath, "utf8");
  res.send(fileContent);
};
function sleep(miliseconds) {
  var currentTime = new Date().getTime();

  while (currentTime + miliseconds >= new Date().getTime()) {}
}
exports.getVariables = function(req, res) {
  let fullPath = path.resolve(rootDir, req.params[0]);
  let fileContent = fs.readFileSync(fullPath, "utf8");
  let varList = [];

  /* sleep(5000); */

  fileContent.split("{{").forEach(subString => {
    if (subString.includes("}}")) {
      varList.push(subString.split("}}")[0]);
    }
  });
  res.send(varList);
};

exports.buildFile = function(req, res) {
  let fullPath = path.resolve(rootDir, req.params[0]);
  let fileContent = fs.readFileSync(fullPath, "utf8");
  let inputs = Object.keys(req.body);
  inputs.forEach(field => {
    let varName = "{{" + field + "}}";
    fileContent = fileContent.replace(varName, req.body[field]);
  });
  generatedFile = fileContent;
  res.send(fileContent);
};

exports.createFile = function(req, res) {
  let pos = req.params[0].lastIndexOf("."); //get the .[extension] position
  let fileExt = "";
  if (pos > -1) {
    //if extension position found
    req.params[0].substr(pos);
  }

  fs.writeFile(
    path.resolve(rootDir, "newFile" + fileExt),
    generatedFile,
    function(err) {
      if (err) throw err;
      res.send("Saved as 'newFile" + fileExt + "' !");
    }
  );
};
