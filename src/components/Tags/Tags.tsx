import * as React from 'react'
import BushService from '../../services/bush'
import { ITag } from '../../Interfaces/Tags'
import Button from '../Utilities/Buttons/DefaultButton/Button';
import TagForm from './TagForm';
var randomColor = require('randomcolor');

interface ITagsProps{
    setTagsRequest:Function,
    isSelected: Function,
    handleTag:Function
}
const Tags:React.SFC<ITagsProps> = (props) => {
    const {setTagsRequest,isSelected,handleTag} = props
    const [newTagRequest,setNewTagRequest] = React.useState(false)
    const [tags,setTags] = React.useState<Array<ITag>>([]);

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

     const handleNewTag = (tag:ITag) => {
        BushService.post('/tags/insertar',tag)
                   .then(()=>fetchTags())
    }
    return (
        <div className="tags-container">
                <div className="tags-header">
                    <a onClick={()=> {setNewTagRequest(false)}}>
                        {newTagRequest && <i className="icon-left-open"/>}
                    </a>
                    <div className="tags-title">
                        {newTagRequest? 'Nueva Etiqueta' : 'Etiquetas'}
                    </div>
                    <a onClick={() => {setTagsRequest(false)}}>
                        <i className="icon icon-cancel"/>
                    </a>
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
                                {isSelected(tag) && 
                                <i className="icon icon-ok-circled2"/>}
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
    )
}

export default Tags;