const express = require('express');
const router = express.Router();
const collegeController = require("../controllers/collegeController.js");
const internController = require("../controllers/internController.js");

router.post("/colleges", collegeController.createCollegeName);   //createCollegeName

router.post("/interns", internController.createInternName);   //createInternName

router.get("/collegeDetails", collegeController.getCollegeDetails);   //getCollegeDetails


module.exports = router;
