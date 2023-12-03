const bcrypt =require('bcryptjs');
const{Schema,model}=require('mongoose');

const userSchema = new Schema({
  name:{
    type: String,
    required: [true, 'name is required'],
  },
  email:{
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password:{
    type: String,
    required: [true, 'Password is required'],
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9]{3,30}$/.test(value);
      },
      message: 'Password must contain at least 3 characters, including one letter and one number.',
    },
  },
  address:{
    type:String,
    required: [true, 'Address is required'],
  }},
{ timestamps: true });

const User = model('User', userSchema);

module.exports = {
   User
};