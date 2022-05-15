import { Schema, model } from "mongoose";

const message = new Schema({
  message: String,
  sender: String,
  reciever: String,
  date: Date
})

const Message =  model('Message', message);

export default Message;