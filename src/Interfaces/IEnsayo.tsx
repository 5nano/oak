import { ITag } from "./Tags";
import { ICrop } from "./Crop";

export type IEnsayo = {
    idAssay: number,
    idCrop: number,
    crop: ICrop,
    user: string
    name: string,
    description: string,
    experiments:Number,
    idAgrochemicals: Array<Number>,
    idMixtures: Array<Number>,
    treatments:Number,
    tags: Array<ITag>,
    created:string,
    estimatedFinished:string,
    finishedDate:string,
    state?:string,
    stars?: number,
    comments?:string

}