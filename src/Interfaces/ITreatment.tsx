import { IMix } from "./Mix";
import { IAgrochemical } from "./Agrochemical";

export interface ITreatment{
    idAssay:Number,
    idTreatment?:Number,
    mixture:IMix,
    agrochemical:IAgrochemical,
    experimentsLength: Number,
    name:string,
    description:string,
    pressure: Number,
    qrs?:string[];
}

export  interface ITreatmentBackend{
    idAssay:Number,
    name:string,
    description:string,
    pressure: Number,
    experimentsLength:Number,
    idMixture: Number,
    idAgrochemical: Number
}
