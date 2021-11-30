import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type DiscussionDocument = Discussions & Document;

@Schema({
    toJSON: {
        virtuals: true,
        transform: (doc: any, ret: any) => {
            delete ret._id;
        },
    },
    versionKey: false,
})
export class Discussions {
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
    creationDate: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    author: string;

    @Prop({
        type: Number,
        required: true,
        trim: true,
    })
    responses: number;
}

export const DiscussionsSchema = SchemaFactory.createForClass(Discussions);