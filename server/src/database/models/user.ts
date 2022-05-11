import { Schema, model } from "mongoose";

const user = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
})

const User =  model('User', user);

export default User;