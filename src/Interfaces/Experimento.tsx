export interface IBackendExperiment {
    experimentId: string,
    values: Array<number>
}

export interface IFrontExperiment {
    experimentId: string,
    plotColor: string,
    values: Array<number>
}