import {Injectable, NotFoundException, UnprocessableEntityException} from '@nestjs/common';
import {catchError, defaultIfEmpty, filter, map, mergeMap, Observable, of, throwError} from "rxjs";
import {CreateDiscussionDto} from "./dto/create-discussion.dto";
import {DiscussionEntity} from "./entities/discussion.entity";
import {DiscussionDao} from "./dao/discussion.dao";
import {Discussion} from "./schemas/discussion.schema";
import {UpdateDiscussionDto} from "./dto/update-discussion.dto";

@Injectable()
export class DiscussionService {
    constructor(private readonly _discussionDao: DiscussionDao) {
    }

    create =  (createDiscussionDto: CreateDiscussionDto) : Observable<DiscussionEntity> =>
        this._discussionDao.save(createDiscussionDto).pipe(
            catchError((e) =>
                throwError(() => new UnprocessableEntityException(e.message))
            ),
            map((_:Discussion) => new DiscussionEntity(_))
        );

    findAll = (): Observable<DiscussionEntity[] | void> =>
        this._discussionDao.find().pipe(
            filter((_:Discussion[]) => !!_),
            map((_: Discussion[]) => _.map((_: Discussion) => new DiscussionEntity(_))),
            defaultIfEmpty(undefined),
        )



    findOne = (id: string): Observable<DiscussionEntity> =>
        this._discussionDao.findById(id).pipe(
            catchError((e) =>
                throwError(() => new UnprocessableEntityException(e.message)),
            ),
            mergeMap((_: Discussion) =>
                !!_
                    ? of(new DiscussionEntity(_))
                    : throwError(
                        () => new NotFoundException(`Discussion with id '${id}' not found`),
                    ),
            ),
        );

    update = (id: string, updateDiscussionDto: UpdateDiscussionDto) : Observable<DiscussionEntity> => {
        return this._discussionDao.findByIdAndUpdate(id, updateDiscussionDto).pipe(
            catchError((e) =>
                throwError(() => new UnprocessableEntityException(e.message)),
            ),
            mergeMap((_: Discussion) =>
                !!_
                    ? of(new DiscussionEntity(_))
                    : throwError(
                        () => new NotFoundException(`Discussion with id '${id}' not found`),
                    ),
            ),
        );
    };

    remove = (id: string): Observable<void> =>
        this._discussionDao.findByIdAndRemove(id).pipe(
            catchError((e) =>
                throwError(() => new UnprocessableEntityException(e.message)),
            ),
            mergeMap((_:Discussion) =>
                !!_
                    ? of(undefined)
                    : throwError(
                        () => new NotFoundException(`Discussion with id '${id}' not found`),
                    ),
            ),
        );
}
