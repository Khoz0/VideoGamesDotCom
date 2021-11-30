import {Injectable} from "@nestjs/common";
import {defaultIfEmpty, filter, from, map, Observable} from "rxjs";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Post, PostDocument} from "../schemas/post.schema";
import {CreatePostDto} from "../dto/create-post.dto";
import {UpdatePostDto} from "../dto/update-post.dto";

@Injectable()
export class PostDao {

    constructor(
        @InjectModel(Post.name)
        private readonly _postModel: Model<PostDocument>,
    ) {}

    save = (post : CreatePostDto): Observable<Post> =>
        from(new this._postModel(post).save()).pipe(
            map((doc: PostDocument) => doc.toJSON())
        )

    find = (): Observable<Post[] | void> =>
        from(this._postModel.find({})).pipe(
            filter((docs: PostDocument[]) => !!docs && docs.length > 0),
            map((docs: PostDocument[]) =>
                docs.map((_: PostDocument) => _.toJSON()),
            ),
            defaultIfEmpty(undefined)
        );

    findById = (id: string): Observable<Post | void> =>
        from(this._postModel.findById(id)).pipe(
            filter((doc: PostDocument) => !!doc),
            map((doc: PostDocument) => {
                console.log(doc)
                doc.toJSON()
            }),
            defaultIfEmpty(undefined)
        );

    findByIdAndUpdate = (
        id: string,
        post: UpdatePostDto,
    ): Observable<Post | void> =>
        from(
            this._postModel.findByIdAndUpdate(id, post, {
                new: true,
                runValidators: true,
            }),
        ).pipe(
            filter((doc: PostDocument) => !!doc),
            map((doc: PostDocument) => doc.toJSON()),
            defaultIfEmpty(undefined),
        );

    findByIdAndRemove = (id: string): Observable<Post | void> =>
        from(this._postModel.findByIdAndRemove(id)).pipe(
            filter((doc: PostDocument) => !!doc),
            map((doc: PostDocument) => doc.toJSON()),
            defaultIfEmpty(undefined),
        );
}