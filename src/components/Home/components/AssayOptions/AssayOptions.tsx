import * as React from 'react'
import Button from '../../../Utilities/Buttons/DefaultButton/Button'
import BushService from '../../../../services/bush';
import { ITag } from '../../../../Interfaces/Tags';
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
    const {onTreatments,onRemove,onQrs,handleTag, selectedTags, idAssay} = props;

    const [tagsRequest,setTagsRequest] = React.useState(false)
   
    const [tags,setTags] = React.useState<Array<ITag>>([])

    const isSelected = (tag:ITag):boolean => {
        return selectedTags.some(selectedTag => selectedTag.name === tag.name)
    }

    React.useEffect(()=>{
        BushService.get('/tags')
                   .then((data:Array<ITag>) => setTags(data))
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
                    {tags.map(tag => {
                        var color = randomColor()
                        console.log(color)
                        return (
                            
                            <div className="tag" 
                                onClick={()=> handleTag(tag)}
                                style={{backgroundColor:color}} >
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
                    })}
                </div>
            )}
            <Button title="Eliminar"
                    className="action-button"
                    onClick={()=>onRemove(idAssay)}
                />
     </div>
    )
}

export default AssayOptions;