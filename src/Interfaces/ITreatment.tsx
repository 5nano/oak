export default interface ITreatment{
    idAssay?:Number,
    idTreatment?:Number,
    idMixture?:Number,
    idAgrochemical?:Number,
    experimentsLength: Number,
    name:string,
    description:string
    qrs?:string[];
}
