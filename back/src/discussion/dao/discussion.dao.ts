import {Injectable} from "@nestjs/common";
import {CreateDiscussionDto} from "../dto/create-discussion.dto";
import {defaultIfEmpty, filter, from, map, Observable} from "rxjs";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Discussion, DiscussionDocument} from "../schemas/discussion.schema";
import {UpdateDiscussionDto} from "../dto/update-discussion.dto";

@Injectable()
export class DiscussionDao {

    constructor(
        @InjectModel(Discussion.name)
        private readonly _discussionModel: Model<DiscussionDocument>,
    ) {}

    save = (discussion : CreateDiscussionDto): Observable<Discussion> =>
        from(new this._discussionModel(discussion).save()).pipe(
            map((doc: DiscussionDocument) => doc.toJSON())
        )

    find = (): Observable<Discussion[] | void> =>
        from(this._discussionModel.find({})).pipe(
            filter((docs: DiscussionDocument[]) => !!docs && docs.length > 0),
            map((docs: DiscussionDocument[]) =>
                docs.map((_: DiscussionDocument) => _.toJSON()),
            ),
            defaultIfEmpty(undefined)
        );

    findById = (id: string): Observable<Discussion | void> =>
        from(this._discussionModel.findById(id)).pipe(
            filter((doc: DiscussionDocument) => !!doc),
            map((doc: DiscussionDocument) => doc.toJSON()),
            defaultIfEmpty(undefined)
        );

    findByIdAndUpdate = (
        id: string,
        discussion: UpdateDiscussionDto,
    ): Observable<Discussion | void> =>
        from(
            this._discussionModel.findByIdAndUpdate(id, discussion, {
                new: true,
                runValidators: true,
            }),
        ).pipe(
            filter((doc: DiscussionDocument) => !!doc),
            map((doc: DiscussionDocument) => doc.toJSON()),
            defaultIfEmpty(undefined),
        );

    findByIdAndRemove = (id: string): Observable<Discussion | void> =>
        from(this._discussionModel.findByIdAndRemove(id)).pipe(
            filter((doc: DiscussionDocument) => !!doc),
            map((doc: DiscussionDocument) => doc.toJSON()),
            defaultIfEmpty(undefined),
        );
}