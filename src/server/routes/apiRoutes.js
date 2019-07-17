"use strict";
var express = require("express");
const fs = require("fs");
const path = require("path");
var arborizer = require("../controllers/arboController");
var template = require("../controllers/templateController");

var router = express.Router();

const rootDir = global.config.templatesRootPath;

/* MENU */
router.get("/menu", arborizer.buildMenu);

/* TEMPLATES */
var isFile = function(req, res, next) {
  let fullPath = path.resolve(rootDir, req.params[0]);
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
    //if element is file
    next();
  } else {
    console.log(req.params[0]);
    res.status(400).send("Bad reeeeeequest !");
  }
};

//templates
router
  .route("/templates/content/*")
  .all(isFile)
  .get(template.getContent);

router
  .route("/templates/var/*")
  .all(isFile)
  .get(template.getVariables)
  .post(template.buildFile);

router
  .route("/templates/save/*")
  .all(isFile)
  .get(template.createFile);

module.exports = router;
