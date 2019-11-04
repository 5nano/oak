import * as React from 'react'
import Button from '../../../Utilities/Buttons/DefaultButton/Button'
import BushService from '../../../../services/bush';
import { ITag } from '../../../../Interfaces/Tags';
import TagForm from '../../../Tags/TagForm';
import Tags from '../../../Tags/Tags';
import { RouteComponentProps } from 'react-router';
import { HomeContext, IHomeContext } from '../../Home';
import { createContext } from 'vm';


interface IAssayOptionsProps extends RouteComponentProps{
    idAssay: Number
    selectedTags:Array<ITag>
    handleTag:Function,
    setOptions:Function,
}


const AssayOptions:React.SFC<IAssayOptionsProps> = (props) => {
    const {selectedTags,
           idAssay,
           handleTag,
           setOptions} = props;

    const [tagsRequest,setTagsRequest] = React.useState(false)
   
    const isSelected = (tag:ITag):boolean => {
        return selectedTags.some(selectedTag => selectedTag.name === tag.name)
    }

    const goToQrs = () => {
        props.history.push(`/assay/${idAssay}/qrs`);
    }

    const goToTreatments = () => {
        props.history.push(`/assay/${idAssay}/treatments`);
    }

    const activeAssay = ():Promise<void> => {
        return BushService.patch(`/ensayo/activar?idAssay=${idAssay}`)
                   
    }
    const archiveAssay = ():Promise<void> => {
        return BushService.patch(`/ensayo/archivar?idAssay=${idAssay}`)
                  
    }

    const remove = ():Promise<void> =>{
       return BushService.post(`/ensayos/eliminar?assayId=${idAssay}`)
    }
    
    return(
        <HomeContext.Consumer>
            {(context:IHomeContext) => (
                <div className="assay-options-container">

                    {!tagsRequest?
                        [<div className="options-header">
                            <a onClick={()=>{setOptions(false)}}>
                                <i className="icon-left-open"/>
                            </a>
                            <div className="options-title">
                                Opciones
                            </div>
                            <a onClick={()=> {setOptions(false)}}>
                                <i className="icon icon-cancel"/>
                            </a>
                        </div>,
                        <div className="assay-options">
                            <a className="option"
                            onClick={()=>goToTreatments()}>
                                Tratamientos
                            </a>
                            <a className="option"
                                onClick={()=>goToQrs()}>
                                Codigos QR
                            </a>
                            <a className="option"
                                onClick={()=>setTagsRequest(!tagsRequest)}>
                                Tags
                            </a>
                            <a className="option"
                                onClick={()=>context.finishAssay(idAssay)}>
                                Finalizar
                            </a>
                            <a className="option"
                                onClick={()=>{
                                    archiveAssay().then(()=>{
                                        context.setFeedback({variant:'success',message:'Ensayo archivado exitosamente'})
                                        context.updateAssays()
                                    })
                                    }}>
                                Archivar
                            </a>
                            <a className="option"
                                onClick={()=>{
                                    activeAssay().then(()=>{
                                        context.setFeedback({variant:'success',message:'Ensayo activado exitosamente'})
                                        context.updateAssays()
                                    })
                                    }}>
                                Activar
                            </a>
                            <a className="option"
                                onClick={()=>{
                                    remove().then(()=>{
                                        context.setFeedback({variant:'success',message:'Ensayo eliminado exitosamente'})
                                        context.updateAssays()
                                    })
                                    .catch(error => {
                                        error.json().then(error =>context.setFeedback({variant:'error',message:error.message})
                                        )
                                    })
                                    }}>
                                Eliminar 
                            </a>
                        </div>]
                    :
                    <Tags isSelected={isSelected} 
                        setTagsRequest={setTagsRequest}
                        handleTag={handleTag}
                        updateAssays={context.updateAssays}/>
                    }
            </div>
                    )}
     </HomeContext.Consumer>
    )
}

export default AssayOptions;