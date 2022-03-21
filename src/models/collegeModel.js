const mongoose = require("mongoose");

// fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`}, 

const collegeSchema = new mongoose.Schema({
    "name": {
        type : String,
        unique : true,
        required : 'Name is required',
        trim : true
    },
    "fullName": {
        type : String,
        unique : true,
        required : 'fullName is required',
        trim : true
    },
    "logoLink": {
        type : String,
        required : 'Logo is required',
    //     validate : {
    //         validator : function(logoLink){
    //             return /?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-]*)?\??(?:[-\+=&;%@.\w]*)#?(?:[\w]*))?)/.test(logoLink)
    //         }, message:'URL is invalid, Please check your link.', isAsync:false
    //     }
    },
    "isDeleted": {
        type : Boolean,
        default : false
    }
},{timestamps: true})

module.exports = mongoose.model("collegeName", collegeSchema);