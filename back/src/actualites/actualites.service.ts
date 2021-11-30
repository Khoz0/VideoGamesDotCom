import {Injectable, NotFoundException, UnprocessableEntityException} from '@nestjs/common';
import {catchError, defaultIfEmpty, filter, map, mergeMap, Observable, of, throwError} from "rxjs";
import {CreateActualitesDto} from "./dto/create-actualites.dto";
import {ActualitesEntity} from "./entities/actualites.entity";
import {ActualitesDao} from "./dao/actualites.dao";
import {UpdateActualitesDto} from "./dto/update-actualites.dto";
import {Actualites} from "./schemas/actualites.schema";

@Injectable()
export class ActualitesService {
    constructor(private readonly _actualitesDao: ActualitesDao) {
    }

    create =  (createActualitesDto: CreateActualitesDto) : Observable<ActualitesEntity> =>
        this._actualitesDao.save(createActualitesDto).pipe(
            catchError((e) =>
                throwError(() => new UnprocessableEntityException(e.message))
            ),
            map((_:Actualites) => new ActualitesEntity(_))
        );

    findAll = (): Observable<ActualitesEntity[] | void> =>
        this._actualitesDao.find().pipe(
            filter((_:Actualites[]) => !!_),
            map((_: Actualites[]) => _.map((_: Actualites) => new ActualitesEntity(_))),
            defaultIfEmpty(undefined),
        )



    findOne = (id: string): Observable<ActualitesEntity> =>
        this._actualitesDao.findById(id).pipe(
            catchError((e) =>
                throwError(() => new UnprocessableEntityException(e.message)),
            ),
            mergeMap((_: Actualites) =>
                !!_
                    ? of(new ActualitesEntity(_))
                    : throwError(
                        () => new NotFoundException(`Actualites with id '${id}' not found`),
                    ),
            ),
        );

    update = (id: string, updateActualitesDto: UpdateActualitesDto) : Observable<ActualitesEntity> => {
        return this._actualitesDao.findByIdAndUpdate(id, updateActualitesDto).pipe(
            catchError((e) =>
                throwError(() => new UnprocessableEntityException(e.message)),
            ),
            mergeMap((_: Actualites) =>
                !!_
                    ? of(new ActualitesEntity(_))
                    : throwError(
                        () => new NotFoundException(`Actualites with id '${id}' not found`),
                    ),
            ),
        );
    };

    remove = (id: string): Observable<void> =>
        this._actualitesDao.findByIdAndRemove(id).pipe(
            catchError((e) =>
                throwError(() => new UnprocessableEntityException(e.message)),
            ),
            mergeMap((_:Actualites) =>
                !!_
                    ? of(undefined)
                    : throwError(
                        () => new NotFoundException(`Actualites with id '${id}' not found`),
                    ),
            ),
        );
}
