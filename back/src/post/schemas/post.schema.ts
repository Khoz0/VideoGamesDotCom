import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type PostDocument = Post & Document;

@Schema({
    toJSON: {
        virtuals: true,
        transform: (doc: any, ret: any) => {
            delete ret._id;
        },
    },
    versionKey: false,
})
export class Post {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    })
    _id: any;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    idDiscussion: any;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    author: string;

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
}

export const PostSchema = SchemaFactory.createForClass(Post);