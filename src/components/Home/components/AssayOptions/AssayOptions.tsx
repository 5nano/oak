import * as React from 'react'
import Button from '../../../Utilities/Buttons/DefaultButton/Button'
import BushService from '../../../../services/bush';
import { ITag } from '../../../../Interfaces/Tags';
import TagForm from '../../../Tags/TagForm';
import Tags from '../../../Tags/Tags';


interface IAssayOptionsProps{
    idAssay: Number,
    onTreatments:Function,
    onQrs:Function,
    onRemove:Function,
    finishAssay:Function,
    archiveAssay:Function,
    activeAssay:Function,
    handleTag:Function,
    selectedTags:Array<ITag>
}


const AssayOptions:React.SFC<IAssayOptionsProps> = (props) => {
    const {onTreatments,
           onRemove,
           onQrs,
           finishAssay,
           archiveAssay,
           activeAssay,
           selectedTags,
           handleTag,
           idAssay} = props;

    const [tagsRequest,setTagsRequest] = React.useState(false)
   
    const isSelected = (tag:ITag):boolean => {
        return selectedTags.some(selectedTag => selectedTag.name === tag.name)
    }

    return(
        <div className="assay-options-container">

            {!tagsRequest?
                <div className="assay-options">
                    <Button title="Tratamientos"
                            className="option-button"
                            onClick={()=>onTreatments(idAssay)}
                            />
                    <Button title="Códigos QR"
                            className="option-button"
                            onClick={()=>onQrs(idAssay)}
                        />
                    <Button title="Tags"
                            className="option-button"
                            onClick={()=>setTagsRequest(!tagsRequest)}
                        />
                    <Button title="Eliminar"
                            className="option-button"
                            onClick={()=>onRemove(idAssay)}
                    />
                    <Button title="Finalizar"
                            className="option-button"
                            onClick={()=>finishAssay(idAssay)}/>
                    <Button title="Archivar"
                            className="option-button"
                            onClick={()=>archiveAssay(idAssay)}/>
                    <Button title="Activar"
                            className="option-button"
                            onClick={()=>activeAssay(idAssay)}/>
                </div>
            :
            <Tags isSelected={isSelected} 
                  setTagsRequest={setTagsRequest}
                  handleTag={handleTag}/>
            }
     </div>
    )
}

export default AssayOptions;