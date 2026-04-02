import {Document, Types } from "mongoose";

export interface SetupTokenDocument extends Document {
    token : string
    providerId : Types.ObjectId
    email : string
    expiresAt : Date
    used : boolean
    createdAt : Date
    updatedAt : Date
}