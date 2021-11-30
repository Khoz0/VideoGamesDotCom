import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type ActualitesDocument = Actualites & Document;

@Schema({
    toJSON: {
        virtuals: true,
        transform: (doc: any, ret: any) => {
            delete ret._id;
        },
    },
    versionKey: false,
})
export class Actualites {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    })
    _id: any;

    @Prop({
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    })
    title: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    text: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    creationDate: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    author: string;
}

export const ActualitesSchema = SchemaFactory.createForClass(Actualites);