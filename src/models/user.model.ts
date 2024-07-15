import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
const UserSchema = new Schema({
  userName: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: ["admin", "user"],
  },
  profileImage: {
    type: String,
    required: [true, "Profile Image is required"],
  },
},{
    timestamps:true
});

UserSchema.pre('save',function(next){
    let hashedpsswd=bcrypt.hashSync(this.password,10)
    this.password=hashedpsswd;
    next()
})

export const User=mongoose.model("user",UserSchema)