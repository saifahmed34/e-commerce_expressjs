const mongoose = require('mongoose');
const Category = require('./Category');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },


        description:{
        type:String,
        required:true
    },



        image:{
        type:String,
        default:""
    },
    Price:{
        type:Number,
        default:0
    },


        Category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },


        Stock:{
        type:Number,
        min:0,
        max:100
    },

    isFeatured:{
        type:Boolean,
        default:false
    },
    CreatedAt:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("Users", userSchema);


