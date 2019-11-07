import * as React from 'react'
import { IEnsayo } from '../../Interfaces/IEnsayo'
import { ITreatment } from '../../Interfaces/ITreatment'
import { ITest, IBackendExperiment, IExperiment } from '../../Interfaces/Experimento'
import BushService from '../../services/bush';
import ExperimentPopover from './Components/ExperimentPopover';
import classnames from 'classnames';

interface IPhotosGalleryState {
    assays:Array<IEnsayo>,
    treatments:Array<ITreatment>
    experiments: Array<IExperiment>
    experimentImages:Array<ITest>
    loading:boolean,
    selectedAssayId:Number,
    selectedTreatmentId:Number,
    selectedExperimentId:Number,
    experimentImageFocus:ITest
}
interface IPhotosGalleryProps{

}

class PhotosGallery extends React.Component<IPhotosGalleryProps,IPhotosGalleryState> {

    constructor(props){
        super(props)
        this.state={
            assays:[],
            treatments:[],
            experiments:[],
            experimentImages:[],
            loading:true,
            selectedAssayId: null,
            selectedTreatmentId:null,
            selectedExperimentId:null,
            experimentImageFocus:null
        }
    }

    setLoading(value:boolean){
        this.setState({loading:value})
    }

    componentDidMount(){
        BushService.get('/ensayos')
                    .then((data:Array<IEnsayo>) => {
                        this.setState({assays:data,loading:false})
                    })
    }

    showTreatments(idAssay:Number){
        this.setLoading(true)
        this.setState({loading:true,selectedAssayId:null,selectedTreatmentId:null,selectedExperimentId:null})
        BushService.get(`/ensayo/tratamientos?idAssay=${idAssay}`)
                    .then((data:Array<ITreatment>) => {
                        this.setState({treatments:data,loading:false,selectedAssayId:idAssay})
                    })
    }

    showExperiments(idTreatment:Number){
        this.setLoading(true)
        this.setState({loading:true,selectedExperimentId:null,selectedTreatmentId:null})
        BushService.get(`/tratamiento/experimentos?treatmentId=${idTreatment}`)
                    .then((data:Array<IExperiment>) => {
                        this.setState({experiments:data,loading:false,selectedTreatmentId:idTreatment})
                    })
        
    }

    showExperimentImages(idExperiment:Number){
        this.setLoading(true)
        BushService.get(`/experiment/points?experimentId=${idExperiment}`)
                    .then((data:Array<ITest>) => {
                        this.setState({experimentImages:data,loading:false,selectedExperimentId:idExperiment})
                    })
    }

    showImage(experimentImage:ITest){
        this.setState({experimentImageFocus:experimentImage})
    }

    closeImage(){
        this.setState({experimentImageFocus:null})
    }
    render(){
        return (
            <div id="gallery-container" className="gallery-container">
                <div className="options-sidebar treatments">
                    <div className="option-sidebar column-title">
                        Ensayo
                    </div>
                        {this.state.assays.map(assay => {
                            const assayClassName = classnames({ 'option-sidebar': true, selected: assay.idAssay === this.state.selectedAssayId})
                            return (
                                <div className={assayClassName} onClick={()=>this.showTreatments(assay.idAssay)}>
                                    {assay.name}
                                </div>
                            )
                        })}
                </div>
                
                {this.state.selectedAssayId &&
                <div className="options-sidebar experiments">
                    <div className="option-sidebar column-title">
                        Tratamiento
                    </div>
                    {this.state.treatments.map(treatment => {
                        const treatmentClassName = classnames({ 'option-sidebar': true, selected: treatment.idTreatment === this.state.selectedTreatmentId})
                        return (
                            <div className={treatmentClassName} onClick={()=>this.showExperiments(treatment.idTreatment)}>
                                {treatment.name}
                            </div>
                        )
                    })}
                </div>
                }

                {this.state.selectedTreatmentId &&
                <div className="options-sidebar">
                    <div className="option-sidebar column-title">
                        Experimento
                    </div>
                    {this.state.experiments.map(experiment => {
                        const experimentClassName = classnames({ 'option-sidebar': true, selected: experiment.experimentId === this.state.selectedExperimentId})
                        return (
                            <div className={experimentClassName} onClick={()=>this.showExperimentImages(experiment.experimentId)}>
                                {experiment.nombre}
                            </div>
                        )
                    })}
                </div>
                }

                {this.state.selectedExperimentId &&
                <div className="experiment-images-container">
                    <div className="experiment-images">
                    <div className="experiment-image column-title">
                        Imagenes
                    </div>
                    <div className="space-div" />
                    <div className="images-flex">
                        {this.state.experimentImages.map(experimentImage => (
                            <div className="experiment-image-container">
                                <p className="timestamp">{experimentImage.timestamp}</p>
                                <img src={experimentImage.pathImage}
                                    onClick={()=>this.showImage(experimentImage)}/>
                            </div>
                        ))}
                    </div>
                    </div>
                </div>
                }

                {this.state.experimentImageFocus &&
                    <ExperimentPopover experiment={this.state.experimentImageFocus}
                                        closeExperimentImage={this.closeImage.bind(this)}/>
                
                }
            </div>

        )
    }
}

export default PhotosGallery;