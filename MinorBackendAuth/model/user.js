const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    Name:{
        type:String,
        default:null
    },
 
    email:{
        type:String,
        unique:true,
        required:[true]
    },
    password:{
        type:String
    }
    ,
    token:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    },

})

module.exports=mongoose.model('user',userSchema)