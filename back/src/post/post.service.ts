import {Injectable, NotFoundException, UnprocessableEntityException} from '@nestjs/common';
import {catchError, defaultIfEmpty, filter, map, mergeMap, Observable, of, throwError} from "rxjs";
import {PostDao} from "./dao/post.dao";
import {CreatePostDto} from "./dto/create-post.dto";
import {PostEntity} from "./entities/post.entity";
import {Post} from "./schemas/post.schema";
import {UpdatePostDto} from "./dto/update-post.dto";

@Injectable()
export class PostService {
    constructor(private readonly _postDao: PostDao) {
    }

    create =  (createPostDto: CreatePostDto) : Observable<PostEntity> =>
        this._postDao.save(createPostDto).pipe(
            catchError((e) =>
                throwError(() => new UnprocessableEntityException(e.message))
            ),
            map((_:Post) => new PostEntity(_))
        );

    findAll = (): Observable<PostEntity[] | void> =>
        this._postDao.find().pipe(
            filter((_:Post[]) => !!_),
            map((_: Post[]) => _.map((_: Post) => new PostEntity(_))),
            defaultIfEmpty(undefined),
        )



    findOne = (id: string): Observable<PostEntity> =>
        this._postDao.findById(id).pipe(
            catchError((e) =>
                throwError(() => new UnprocessableEntityException(e.message)),
            ),
            mergeMap((_: Post) =>
                !!_
                    ? of(new PostEntity(_))
                    : throwError(
                        () => new NotFoundException(`Post with id '${id}' not found`),
                    ),
            ),
        );

    update = (id: string, updatePostDto: UpdatePostDto) : Observable<PostEntity> => {
        return this._postDao.findByIdAndUpdate(id, updatePostDto).pipe(
            catchError((e) =>
                throwError(() => new UnprocessableEntityException(e.message)),
            ),
            mergeMap((_: Post) =>
                !!_
                    ? of(new PostEntity(_))
                    : throwError(
                        () => new NotFoundException(`Post with id '${id}' not found`),
                    ),
            ),
        );
    };

    remove = (id: string): Observable<void> =>
        this._postDao.findByIdAndRemove(id).pipe(
            catchError((e) =>
                throwError(() => new UnprocessableEntityException(e.message)),
            ),
            mergeMap((_:Post) =>
                !!_
                    ? of(undefined)
                    : throwError(
                        () => new NotFoundException(`Post with id '${id}' not found`),
                    ),
            ),
        );
}
