const mongoose = require('mongoose');

const erplsch = new mongoose.Schema({
    _id : {type:Number,require :true},
    pl_name : {type :String,require : true},
    pl_money:{type : Number,default : 0},
    pl_mv:{type : Number,default : 0},
    so_weight:{type : Number,default : 10},
    so_crysoal:{type : String,default : 'A1'},
    weapon_a:{type : String,default : 'D1'},
    weapon_b:{type : String,default : null},
    so_bag:{type : Array,default:null},
    weapon_bag:{type : Array,default:null},
    
},{versionKey : false});


module.exports = mongoose.model('erDatabase',erplsch);