import mongoose, { Schema } from "mongoose";
import { Event } from "./event.model";

const RegisterEventSchema = new Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Evnet is required to registered"],
  },
  users: {
      type: mongoose.Schema.Types.ObjectId,
  },
  ticketQuantity:{
    type:Number,
    default:1
  },
  finalAmt: {
    type: Number,
  },
});

RegisterEventSchema.pre("save", async function (next) {
  const event = await Event.findById(this.eventId);
  if (event) {
    this.finalAmt = this.ticketQuantity * event.price;
    let totalRegisredUser = event.registeredUser;
    totalRegisredUser += this.ticketQuantity;
    await Event.findByIdAndUpdate(this.eventId, {
      registeredUser: totalRegisredUser,
    });
  }
});

export const RegisterEvent=mongoose.model("registerEvent",RegisterEventSchema)