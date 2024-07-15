import mongoose, { Schema } from "mongoose";

const EventSchema = new Schema({
  eventName: {
    type: String,
    required: [true, "Event name is required"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
  venue: {
    type: String,
    required: [true, "Venue is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  capacity: {
    type: Number,
    required: [true, "Capacity is required"],
  },
  registeredUser:{
    type:Number,
    default:0
  }
},{
    timestamps:true
});

export const Event=mongoose.model("event",EventSchema)