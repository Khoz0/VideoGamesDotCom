import {Injectable} from "@nestjs/common";
import {CreateActualitesDto} from "../dto/create-actualites.dto";
import {defaultIfEmpty, filter, from, map, Observable} from "rxjs";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {UpdateActualitesDto} from "../dto/update-actualites.dto";
import {Actualites, ActualitesDocument} from "../schemas/actualites.schema";

@Injectable()
export class ActualitesDao {

    constructor(
        @InjectModel(Actualites.name)
        private readonly _actualitesModel: Model<ActualitesDocument>,
    ) {}

    save = (actualites : CreateActualitesDto): Observable<Actualites> =>
        from(new this._actualitesModel(actualites).save()).pipe(
            map((doc: ActualitesDocument) => doc.toJSON())
        )

    find = (): Observable<Actualites[] | void> =>
        from(this._actualitesModel.find({})).pipe(
            filter((docs: ActualitesDocument[]) => !!docs && docs.length > 0),
            map((docs: ActualitesDocument[]) =>
                docs.map((_: ActualitesDocument) => _.toJSON()),
            ),
            defaultIfEmpty(undefined)
        );

    findById = (id: string): Observable<Actualites | void> =>
        from(this._actualitesModel.findById(id)).pipe(
            filter((doc: ActualitesDocument) => !!doc),
            map((doc: ActualitesDocument) => doc.toJSON()),
            defaultIfEmpty(undefined)
        );

    findByIdAndUpdate = (
        id: string,
        actualites: UpdateActualitesDto,
    ): Observable<Actualites | void> =>
        from(
            this._actualitesModel.findByIdAndUpdate(id, actualites, {
                new: true,
                runValidators: true,
            }),
        ).pipe(
            filter((doc: ActualitesDocument) => !!doc),
            map((doc: ActualitesDocument) => doc.toJSON()),
            defaultIfEmpty(undefined),
        );

    findByIdAndRemove = (id: string): Observable<Actualites | void> =>
        from(this._actualitesModel.findByIdAndRemove(id)).pipe(
            filter((doc: ActualitesDocument) => !!doc),
            map((doc: ActualitesDocument) => doc.toJSON()),
            defaultIfEmpty(undefined),
        );
}