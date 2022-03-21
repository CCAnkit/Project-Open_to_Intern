const collegeModel = require("../models/collegeModel.js");


const isValidValue = function(value){   //it should not be like undefined or null.
    if (typeof value === 'undefined' || value === null) return false   //if the value is undefined or null it will return false.
    if (typeof value === 'string' && value.trim().length === 0) return false   //if the value is string & length is 0 it will return false.
    return true
}

const isValidDetails = function(details){   
    return Object.keys(details).length > 0
}

const createCollegeName = async function(req, res) {
    try{
        const details = req.body
        if(!isValidDetails(details)){
            res.status(400).send({status:false, msg:"Please provide college details"})  //Validate the value that is provided by the Client.
        }
        const {name, fullName, logoLink} = details
        if (!isValidValue(name)){
            return res.status(400).send({status:false, msg:"Please provide name"})   //name is mandory 
        }
        if (!isValidValue(fullName)){
            return res.status(400).send({status:false, msg:"Please provide fullName"})   //fullName is mandory
        }
        if (!isValidValue(logoLink)){
            return res.status(400).send({status:false, msg:"Please provide Logo"})    //logoLink is mandory
        }
        // if(!/?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-]*)?\??(?:[-\+=&;%@.\w]*)#?(?:[\w]*))?)/.test(logoLink)){
        //     return res.status(400).send({status:false,msg:"Please provide valid URL"})    //Regex for checking the valid UrL format 
        // }
        const alreadyUsed = await collegeModel.findOne({fullName})
        if(alreadyUsed){
            return res.status(400).send({status:false, msg:`${fullName} College is already exists`})   //checking the fullName is already exist or not.
        }
        const data = await collegeModel.create(details)  //creating the college details
        res.status(201).send({status: true, msg : "College details saved successfully", data:data})
    }
    catch(err) {
        console.log(err)
        res.status(500).send({msg: err.message})
    }
};

const getCollegeDetails = async function(req, res) {
    try{

    }
    catch(err) {
        console.log(err)
        res.status(500).send({msg: err.message})
    }
};




module.exports.createCollegeName = createCollegeName;

module.exports.getCollegeDetails = getCollegeDetails;