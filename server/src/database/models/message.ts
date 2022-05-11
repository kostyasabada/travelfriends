import { Schema, model } from "mongoose";

const user = new Schema({
  message: String,
  sender: String,
  reciever: String,
  date: Date
})

const User =  model('User', user);

export default User;