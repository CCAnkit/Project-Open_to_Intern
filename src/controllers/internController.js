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
        if(!isValidDetails(details)){
            res.status(400).send({status:false, msg:"Please provide intern details"})  //Validate the value that is provided by the Client.
        }
        const {name, email, mobile, collegeId} = details
        if (!isValidValue(name)){
            return res.status(400).send({status:false, msg:"Please provide Name"})   //name is mandory 
        }
        if (!isValidValue(email)){
            return res.status(400).send({status:false, msg:"Please provide Email"})   //email is mandory
        }
        if (!isValidValue(mobile)){
            return res.status(400).send({status:false, msg:"Please provide Mobile"})    //Mobile is mandory
        }
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            return res.status(400).send({status:false,msg:"Please provide valid Email Address"})    //Regex for checking the valid email format 
        }
        if(!/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/.test(mobile)){
            return res.status(400).send({status:false,msg:"Please provide valid Mobile number"})    //Regex for checking the valid mobile format 
        }
        const emailUsed = await collegeModel.findOne({email})
        if(emailUsed){
            return res.status(400).send({status:false, msg:`${email} Email is already exists`})   //checking the email address is already exist or not.
        }
        const mobileUsed = await collegeModel.findOne({mobile})
        if(mobileUsed){
            return res.status(400).send({status:false, msg:`${mobile} Mobile is already exists`})   //checking the mobile number is already exist or not.
        }
        const data = await collegeModel.create(details)  //creating the intern details
        res.status(201).send({status: true, msg : "College details saved successfully", data:data})
    }
    catch(err) {
        console.log(err)
        res.status(500).send({msg: err.message})
    }
};

module.exports.createInternName = createInternName;