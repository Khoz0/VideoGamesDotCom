import {Injectable, NotFoundException, UnprocessableEntityException} from '@nestjs/common';
import {catchError, defaultIfEmpty, filter, map, mergeMap, Observable, of, throwError} from "rxjs";
import {CreateDiscussionDto} from "./dto/create-discussion.dto";
import {DiscussionsEntity} from "./entities/discussions.entity";
import {DiscussionDao} from "./dao/discussion.dao";
import {Discussions} from "./schemas/discussions.schema";
import {UpdateDiscussionDto} from "./dto/update-discussion.dto";

@Injectable()
export class DiscussionsService {
    constructor(private readonly _discussionDao: DiscussionDao) {
    }

    create =  (createDiscussionDto: CreateDiscussionDto) : Observable<DiscussionsEntity> =>
        this._discussionDao.save(createDiscussionDto).pipe(
            catchError((e) =>
                throwError(() => new UnprocessableEntityException(e.message))
            ),
            map((_:Discussions) => new DiscussionsEntity(_))
        );

    findAll = (): Observable<DiscussionsEntity[] | void> =>
        this._discussionDao.find().pipe(
            filter((_:Discussions[]) => !!_),
            map((_: Discussions[]) => _.map((_: Discussions) => new DiscussionsEntity(_))),
            defaultIfEmpty(undefined),
        )



    findOne = (id: string): Observable<DiscussionsEntity> =>
        this._discussionDao.findById(id).pipe(
            catchError((e) =>
                throwError(() => new UnprocessableEntityException(e.message)),
            ),
            mergeMap((_: Discussions) =>
                !!_
                    ? of(new DiscussionsEntity(_))
                    : throwError(
                        () => new NotFoundException(`Discussion with id '${id}' not found`),
                    ),
            ),
        );

    update = (id: string, updateDiscussionDto: UpdateDiscussionDto) : Observable<DiscussionsEntity> => {
        return this._discussionDao.findByIdAndUpdate(id, updateDiscussionDto).pipe(
            catchError((e) =>
                throwError(() => new UnprocessableEntityException(e.message)),
            ),
            mergeMap((_: Discussions) =>
                !!_
                    ? of(new DiscussionsEntity(_))
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
            mergeMap((_:Discussions) =>
                !!_
                    ? of(undefined)
                    : throwError(
                        () => new NotFoundException(`Discussion with id '${id}' not found`),
                    ),
            ),
        );
}
