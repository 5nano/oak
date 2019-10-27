import { IMix } from "./Mix";
import { IAgrochemical } from "./Agrochemical";

export default interface ITreatment{
    idAssay?:Number,
    idTreatment?:Number,
    mix?:IMix,
    agrochemical?:IAgrochemical,
    experimentsLength: Number,
    name:string,
    description:string,
    pressure: Number,
    qrs?:string[];
}
