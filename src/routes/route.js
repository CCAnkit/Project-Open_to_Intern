const express = require('express');
const router = express.Router();
const controller = require("../controllers/controller.js");


router.post("/colleges", controller.createCollegeName);   //createCollegeName

router.post("/interns", controller.createInternName);   //createInternName

router.get("/collegeDetails", controller.getCollegeDetails);   //getCollegeDetails


module.exports = router;
