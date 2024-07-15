import { ObjectId } from "mongoose";

export interface IRegisterEvent{
    eventId:ObjectId,
    users:ObjectId,
    ticketQuantity:number,
    finalAmt:number
}