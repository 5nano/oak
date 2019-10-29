import * as React from 'react'
import Button from '../../../Utilities/Buttons/DefaultButton/Button'
import BushService from '../../../../services/bush';
import { ITag } from '../../../../Interfaces/Tags';
import TagForm from '../../../Tags/TagForm';
import Tags from '../../../Tags/Tags';
import { RouteComponentProps } from 'react-router';


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

    const activeAssay = () => {
        BushService.patch(`/ensayo/activar?idAssay=${idAssay}`)
                   .then(()=>console.log("activado"))
    }

    const finishAssay = () => {
         BushService.patch(`/ensayo/terminar?idAssay=${idAssay}`)
                   .then(()=>console.log("finalizado"))
    }

    const archiveAssay = () => {
         BushService.patch(`/ensayo/archivar?idAssay=${idAssay}`)
                   .then(()=>console.log("archivado"))
    }

    const  remove = () =>{
        BushService.delete(`/ensayo/eliminar/idAssay=${idAssay}`)
    }
    
    return(
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
                          onClick={()=>finishAssay()}>
                           Finalizar
                       </a>
                       <a className="option"
                          onClick={()=>archiveAssay()}>
                           Archivar
                       </a>
                       <a className="option"
                          onClick={()=>activeAssay()}>
                           Activar
                       </a>
                       <a className="option"
                          onClick={()=>remove()}>
                           Eliminar 
                       </a>
                </div>]
            :
            <Tags isSelected={isSelected} 
                  setTagsRequest={setTagsRequest}
                  handleTag={handleTag}/>
            }
     </div>
    )
}

export default AssayOptions;