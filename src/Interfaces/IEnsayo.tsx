import { ITag } from "./Tags";

export type IEnsayo = {
    idAssay: number,
    idCrop: number,
    idUserCreator: number
    name: string,
    description: string,
    experiments:Number,
    idAgrochemicals: Array<Number>,
    idMixtures: Array<Number>,
    treatments:Number,
    tags: Array<ITag>,
    created:string
}