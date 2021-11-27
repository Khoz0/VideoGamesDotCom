import {Injectable} from "@nestjs/common";
import {Person, PersonDocument} from "../schemas/person.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose"
import {defaultIfEmpty, filter, from, map, Observable} from "rxjs";
import {doc} from "prettier";
import {CreatePersonDto} from "../dto/create-person.dto";
import {UpdatePersonDto} from "../dto/update-person.dto";

@Injectable()
export class PeopleDao {

    constructor(
        @InjectModel(Person.name)
        private readonly _personModel: Model<PersonDocument>,
    ) {}

    find = (): Observable<Person[] | void> =>
        from(this._personModel.find({})).pipe(
            filter((docs: PersonDocument[]) => !!docs && docs.length > 0),
            map((docs: PersonDocument[]) =>
                docs.map((_: PersonDocument) => _.toJSON()),
            ),
            defaultIfEmpty(undefined)
        );

    findById = (id: string): Observable<Person | void> =>
        from(this._personModel.findById(id)).pipe(
            filter((doc: PersonDocument) => !!doc),
            map((doc: PersonDocument) => doc.toJSON()),
            defaultIfEmpty(undefined)
        );

    save = (person : CreatePersonDto): Observable<Person> =>
        from(new this._personModel(person).save()).pipe(
            map((doc: PersonDocument) => doc.toJSON())
        )

    findByIdAndRemove = (id: string): Observable<Person | void> =>
        from(this._personModel.findByIdAndRemove(id)).pipe(
            filter((doc: PersonDocument) => !!doc),
            map((doc: PersonDocument) => doc.toJSON()),
            defaultIfEmpty(undefined),
        );

    findByIdAndUpdate = (
        id: string,
        person: UpdatePersonDto,
    ): Observable<Person | void> =>
        from(
            this._personModel.findByIdAndUpdate(id, person, {
                new: true,
                runValidators: true,
            }),
        ).pipe(
                filter((doc: PersonDocument) => !!doc),
                map((doc: PersonDocument) => doc.toJSON()),
                defaultIfEmpty(undefined),
        );


}