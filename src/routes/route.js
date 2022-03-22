const express = require('express');
const router = express.Router();
const controller = require("../controllers/mainController.js");


router.post("/colleges", controller.createCollege);   //createCollegeName

router.post("/interns", controller.createIntern);   //createInternName

router.get("/collegeDetails", controller.getCollegeDetails);   //getCollegeDetails


module.exports = router;
