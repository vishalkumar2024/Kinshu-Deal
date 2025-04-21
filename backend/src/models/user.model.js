import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  address:{
    type:String,
  },
  employeeCode:{
    type:String,
  },
  medicalCardNumber:{
    type:String,
  },
  role:{
    type:String,
    enum:['admin','user'],
    default:'user'
  },
  balance:{
    type:Number,
    default:0
  },
},{timestamps:true});


userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};


export default mongoose.model('User', userSchema);