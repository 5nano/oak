export interface IBackendExperiment {
    experimentId: string,
    values: Array<number>
}

export interface IFrontExperiment {
    experimentId: string,
    plotColor: string,
    values: Array<number>
}

export interface IExperimentImage{
    assayId:Number,
    treatmentId:Number,
    experimentId:Number,
    pathImage:string,
    timestamp:string,
    width:Number,
    height:Number,
    area:Number,
}