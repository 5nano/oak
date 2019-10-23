import * as React from 'react'
import Button from '../../../Utilities/Buttons/DefaultButton/Button'
import BushService from '../../../../services/bush';
import { ITag } from '../../../../Interfaces/Tags';
import TagForm from '../../../Tags/TagForm';
var randomColor = require('randomcolor');

interface IAssayOptionsProps{
    idAssay: Number,
    onTreatments:Function,
    onQrs:Function,
    onRemove:Function,
    handleTag:Function,
    selectedTags:Array<ITag>
}


const AssayOptions:React.SFC<IAssayOptionsProps> = (props) => {
    const {onTreatments,onRemove,onQrs, selectedTags,handleTag, idAssay} = props;

    const [tagsRequest,setTagsRequest] = React.useState(false)
    const [newTagRequest,setNewTagRequest] = React.useState(false)
    const [tags,setTags] = React.useState<Array<ITag>>([])

    React.useEffect(()=>{
       fetchTags()
    },[])

    const fetchTags=()=>{
        BushService.get('/tags')
                   .then((data:Array<ITag>) => {
                       data.map(tag=>{
                           tag.color=randomColor();
                           return tag
                       })
                       setTags(data)
                    })
    }

    const isSelected = (tag:ITag):boolean => {
        return selectedTags.some(selectedTag => selectedTag.name === tag.name)
    }

    const handleNewTag = (tag:ITag) => {
        BushService.post('/tags/insertar',tag)
                   .then(()=>fetchTags())
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
                </div>
            :
            <div className="tags-container">
                <div className="tags-header">
                    <div className="tags-title">
                        Etiquetas
                    </div>
                    <div onClick={() => {setTagsRequest(false)}}>
                        X
                    </div>
                </div>
                {!newTagRequest?
                    [tags.map(tag => (
                            <div className="tag" 
                                onClick={()=> handleTag(tag)}
                                style={{backgroundColor:tag.color}} >
                                <div className="tag-name">
                                    {tag.name}
                                </div>

                                <div className="tag-check">
                                {isSelected(tag) && 'Check'}
                                </div>
                              
                            </div>
                        )
                    ),
                    <Button title="Crear etiqueta"
                            className="tag-create"
                            onClick={()=>setNewTagRequest(true)}/>]
                    :
                    <TagForm setNewTagRequest={setNewTagRequest}
                                handleNewTag={handleNewTag}/>
                }
            </div>
            }
            
     </div>
    )
}

export default AssayOptions;