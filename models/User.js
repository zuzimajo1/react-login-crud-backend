const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required : true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true }, 
    isAdmin: { type: Boolean, default: false },
},{ timestamps: true });


UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};


module.exports = mongoose.model("User", UserSchema);
