// models/user.js
const { string } = require('joi');
const mongoose = require('mongoose');



const UserSchema = new mongoose.Schema({
  firstName: {
     type: String,
      required: true,
      name: String,
     },
  lastName: {
     type: String,
      required: true,
  },
  email:{
    type:String,
    require: true,
    unique: true

},
password:{
    type:String,
    require: true,

},
isAdmin:{
    type:Boolean,
    require:true,
    default: false,
},
bio:{
    type:String,
},
image:{
    type:String,
    require: true,
    default:"http://localhost:8080/uploads/profile.jpg" 

}
},{
timestamps: true,
})







const UserModel = mongoose.model('UserModel', UserSchema);
module.exports = UserModel;
