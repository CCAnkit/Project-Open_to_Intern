const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const internSchema = new mongoose.Schema({
    "name": {
        type : String,
        required : 'Name is required',
        trim : true
    },
    "email": {
        type : String, 
        required : 'email is required',
        unique : true,
        lowercase : true,
        trim : true,
        validate : {
            validator : function(email){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            }, message:'Email is invalid, Please check your Email address.', isAsync:false
        }
    },
    "mobile": {
        type : Number,
        required : 'Number is required',
        unique : true,
        trim : true,
        validate : {
            validator: function(mobile) {
                return /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/.test(mobile)
            }, message: 'Mobile number is invalid, Please check your Mobile number.', isAsync:false
        }
    },
    "collegeId": {
        type : ObjectId,
        refs : "collegeName"
    },
    "isDeleted": {
        type : Boolean,
        default : false
    }
},{timestamps: true})

module.exports = mongoose.model("InternName", internSchema);