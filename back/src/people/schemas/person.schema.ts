import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type PersonDocument = Person & Document;

@Schema({
    toJSON: {
        virtuals: true,
        transform: (doc: any, ret: any) => {
            delete ret._id;
        },
    },
    versionKey: false,
})
export class Person {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    })
    _id: any;

    @Prop({
        type: String,
        required: true,
        minlength: 2,
        trim: true,
    })
    firstname: string;

    @Prop({
        type: String,
        required: true,
        minlength: 2,
        trim: true,
    })
    lastname: string;

    @Prop({
        type: String,
        required: true,
        minlength: 2,
        trim: true,
    })
    pseudo: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    mail: string;

    @Prop({
        type: String,
        required: true,
        minlength: 8,
        trim: true,
    })
    password: string;
}

export const PersonSchema = SchemaFactory.createForClass(Person);