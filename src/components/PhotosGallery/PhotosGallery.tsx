import * as React from 'react'
import { IEnsayo } from '../../Interfaces/IEnsayo'
import { ITreatment } from '../../Interfaces/ITreatment'
import { ITest, IBackendExperiment, IExperiment } from '../../Interfaces/Experimento'
import BushService from '../../services/bush';
import ExperimentPopover from './Components/ExperimentPopover';
import classnames from 'classnames';
const qs = require('qs');
import Loader from "../Utilities/Loader/Loader";

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
        super(props);
        const initialQuery = qs.parse(props.location.search.slice(1));
        const selectedAssayId = initialQuery['assay'] && Number(initialQuery['assay']);
        this.state={
            loading: true,
            assays:[],
            treatments:[],
            experiments:[],
            experimentImages:[],
            selectedAssayId,
            selectedTreatmentId:null,
            selectedExperimentId:null,
            experimentImageFocus:null
        }
    }

    setLoading(value:boolean){
        this.setState({loading:value})
    }

    componentDidMount(){
        this.setLoading(true)
        BushService.get('/ensayos')
                    .then((data:Array<IEnsayo>) => {
                        this.setState({assays:data}, () => {
                            if (this.state.selectedAssayId) this.showTreatments(this.state.selectedAssayId);
                        })
                    })

        
    }

    showTreatments(idAssay:Number){
        this.setLoading(true)
        this.setState({selectedAssayId:null,selectedTreatmentId:null,selectedExperimentId:null})
        BushService.get(`/ensayo/tratamientos?idAssay=${idAssay}`)
                    .then((data:Array<ITreatment>) => {
                        this.setState({treatments:data,loading:false,selectedAssayId:idAssay}, () => {
                            this.setLoading(false)
                        })
                    })
    }

    showExperiments(idTreatment:Number){
        
        this.setLoading(true)
        this.setState({loading:true,selectedExperimentId:null,selectedTreatmentId:null})
        BushService.get(`/tratamiento/experimentos?treatmentId=${idTreatment}`)
                    .then((data:Array<IExperiment>) => {
                        console.log(data)
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
    debugger;
    render(){
        if (!(this.state.assays.length && this.state.treatments.length) && this.state.loading) {
            return (
                <div style={{display:'flex',justifyContent:'center'}}>
                    <Loader/>
                </div>
            )
        };

        if (!this.state.loading && (!this.state.selectedAssayId || !this.state.assays.find(assay => assay.idAssay === this.state.selectedAssayId))) {
            return (
                <div className="info-content">
                    <div style={{width:'200px', marginTop: "20vh"}} className="info-content-image">
                        <img  style={{opacity:0.5}} src='../../../assets/images/empty-dashboard.png'/>
                    </div>
                    <div className="info-content-description">
                        <p>El ensayo seleccionado no existe. Retorne al inicio y acceda a la galería de imágenes desde un ensayo</p>
                    </div>
                </div>
            )
        }
        if (!this.state.loading && !this.state.treatments.length) {
            return (
                <div className="info-content">
                    <div style={{width:'200px', marginTop: "20vh"}} className="info-content-image">
                        <img  style={{opacity:0.5}} src='../../../assets/images/empty-dashboard.png'/>
                    </div>
                    <div className="info-content-description">
                        <p>Todavía no has tomados fotos para este ensayo.</p>
                    </div>
                </div>
            )
        }

        return (
            <div id="gallery-container" className="gallery-container">
                <div className="options-sidebar treatments">
                    <div className="option-sidebar column-title">
                        Ensayo
                    </div>
                        {
                            this.state.selectedAssayId &&
                            this.state.assays.map(assay => {
                            if (assay && assay.idAssay === this.state.selectedAssayId) {
                                
                                const assayClassName = classnames({ 'option-sidebar': true, selected: assay.idAssay === this.state.selectedAssayId})
                                return (
                                    <div className={assayClassName}>
                                        {assay.name}
                                    </div>
                                )
                            }
                        })
                        }
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
                                {experiment.experimentId}
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