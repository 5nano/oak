import * as React from 'react'
import { IEnsayo } from '../../Interfaces/IEnsayo'
import { ITreatment } from '../../Interfaces/ITreatment'
import { IExperimentImage, IBackendExperiment, IExperiment } from '../../Interfaces/Experimento'
import BushService from '../../services/bush';
import ExperimentPopover from './Components/ExperimentPopover';
interface IPhotosGalleryState {
    assays:Array<IEnsayo>,
    treatments:Array<ITreatment>
    experiments: Array<IExperiment>
    experimentImages:Array<IExperimentImage>
    loading:boolean,
    showTreatments:boolean,
    showExperiments:boolean,
    showExperimentImages:boolean,
    experimentImageFocus:IExperimentImage
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
            showTreatments: false,
            showExperiments:false,
            showExperimentImages:false,
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
        this.setState({loading:true,showTreatments:false,showExperiments:false,showExperimentImages:false})
        BushService.get(`/ensayo/tratamientos?idAssay=${idAssay}`)
                    .then((data:Array<ITreatment>) => {
                        this.setState({treatments:data,loading:false,showTreatments:true})
                    })
    }

    showExperiments(idTreatment:Number){
        this.setLoading(true)
        this.setState({loading:true,showExperimentImages:false,showExperiments:false})
        BushService.get(`/tratamiento/experimentos?treatmentId=${idTreatment}`)
                    .then((data:Array<IExperiment>) => {
                        this.setState({experiments:data,loading:false,showExperiments:true})
                    })
        
    }

    showExperimentImages(idExperiment:Number){
        this.setLoading(true)
        BushService.get(`/experiment/points?experimentId=${idExperiment}`)
                    .then((data:Array<IExperimentImage>) => {
                        this.setState({experimentImages:data,loading:false,showExperimentImages:true})
                    })
    }

    showImage(experimentImage:IExperimentImage){
        this.setState({experimentImageFocus:experimentImage})
    }

    closeImage(){
        this.setState({experimentImageFocus:null})
    }
    render(){
        return (
            <div id="gallery-container" className="gallery-container">
                <div className="options-sidebar">
                    {this.state.assays.map(assay => (
                        <div className="option-sidebar" onClick={()=>this.showTreatments(assay.idAssay)}>
                            {assay.name}
                        </div>
                    ))}
                </div>
                
                {this.state.showTreatments &&
                <div className="options-sidebar">
                    {this.state.treatments.map(treatment => (
                        <div className="option-sidebar" onClick={()=>this.showExperiments(treatment.idTreatment)}>
                            {treatment.name}
                        </div>
                    ))}
                </div>
                }

                {this.state.showExperiments &&
                <div className="options-sidebar">
                    {this.state.experiments.map(experiment => (
                        <div className="option-sidebar" onClick={()=>this.showExperimentImages(experiment.experimentId)}>
                            {experiment.nombre}
                        </div>
                    ))}
                </div>
                }

                {this.state.showExperimentImages &&
                <div className="experiment-images-container">
                    <div className="experiment-images">
                    {this.state.experimentImages.map(experimentImage => (
                        <div className="experiment-image">
                            <img src={experimentImage.pathImage}
                                onClick={()=>this.showImage(experimentImage)}/>
                        </div>
                    ))}
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