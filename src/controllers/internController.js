const internModel = require("../models/internModel.js");
const collegeModel = require("../models/collegeModel.js");

const isValidValue = function(value){   //it should not be like undefined or null.
    if (typeof value === 'undefined' || value === null) return false   //if the value is undefined or null it will return false.
    if (typeof value === 'string' && value.trim().length === 0) return false   //if the value is string & length is 0 it will return false.
    return true
}

const isValidDetails = function(details){   
    return Object.keys(details).length > 0
}

const createInternName = async function(req, res) {
    try{
        const details = req.body
        const {name, email, mobile} = details

        const id = details.collegeId

        if(!isValidDetails(details)){
            res.status(400).send({status:false, msg:"Please provide Intern Details"})  //Validate the value that is provided by the Client.
        }
        if (!isValidValue(name)){
            return res.status(400).send({status:false, msg:"Please provide Name"})   //name is mandory 
        }
        if (!isValidValue(email)){
            return res.status(400).send({status:false, msg:"Please provide Email Address"})   //email is mandory
        }
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            return res.status(400).send({status:false,msg:"Please provide valid Email Address"})    //Regex for checking the valid email format 
        }
        if (!isValidValue(mobile)){
            return res.status(400).send({status:false, msg:"Please provide Mobile number"})    //Mobile is mandory
        }
        if(!/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/.test(mobile)){
            return res.status(400).send({status:false,msg:"Please provide valid Mobile number"})    //Regex for checking the valid mobile format 
        }
        const validateId = await authorModel.findById(id)   //finding by the collegeId
        if(!validateId) {
            return res.status(400).send({status:false, msg:"Invalid College Id"})    //check valid collegeId
        }
        const emailUsed = await internModel.findOne({email})
        if(emailUsed){
            return res.status(400).send({status:false, msg:`${email} Email Address is already exists`})   //checking the email address is already exist or not.
        }
        const mobileUsed = await internModel.findOne({mobile})
        if(mobileUsed){
            return res.status(400).send({status:false, msg:`${mobile} Mobile number is already exists`})   //checking the mobile number is already exist or not.
        }
        const data = await internModel.create(details)  //creating the intern details
        res.status(201).send({status: true, msg : "College details saved successfully", data:data})
    }
    catch(err) {
        console.log(err)
        res.status(500).send({msg: err.message})
    }
};

module.exports.createInternName = createInternName;