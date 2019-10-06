export interface ITreatment{
    experimentsLength: Number,
    name:string,
    description:string
}

export interface ITreatmentProps{
    treatment:ITreatment
}

export interface ITreatmentsProps{
    treatments: ITreatment[]
}