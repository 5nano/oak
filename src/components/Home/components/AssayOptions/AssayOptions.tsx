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
    const isSelected = (tag:ITag):boolean => {
        return selectedTags.some(selectedTag => selectedTag.name === tag.name)
    }

    const [tags,setTags] = React.useState<Array<ITag>>([])

    React.useEffect(()=>{
        BushService.get('/tags')
                   .then((data:Array<ITag>) => {
                       data.map(tag=>{
                           tag.color=randomColor();
                           return tag
                       })
                       setTags(data)
                    })
    },[])

    return(
        <div className="assay-options">
            <Button title="Tratamientos"
                    className="action-button"
                    onClick={()=>onTreatments(idAssay)}
                    />
            <Button title="Códigos QR"
                    className="action-button"
                    onClick={()=>onQrs(idAssay)}
                />
            <Button title="Tags"
                    className="action-button"
                    onClick={()=>setTagsRequest(!tagsRequest)}
                />
            {tagsRequest && 
                (<div className="tags-container">
                    {!newTagRequest?
                        tags.map(tag => (
                                <div className="tag" 
                                    onClick={()=> handleTag(tag)}
                                    style={{backgroundColor:tag.color}} >
                                    <div className="tag-name">
                                        {tag.name}
                                    </div>

                                    {isSelected(tag) &&
                                    <div className="tag-check">
                                        SI
                                    </div>
                                    }
                                </div>
                            )
                        )
                        :
                        <TagForm setNewTagRequest={setNewTagRequest}/>
                    }
                    <Button title="Crear etiqueta"
                            onClick={()=>setNewTagRequest(true)}/>
                </div>)}
            <Button title="Eliminar"
                    className="action-button"
                    onClick={()=>onRemove(idAssay)}
                />
     </div>
    )
}

export default AssayOptions;