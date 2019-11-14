import * as React from 'react'
import BushService from '../../services/bush'
import { ITag } from '../../Interfaces/Tags'
import Button from '../Utilities/Buttons/DefaultButton/Button';
import TagForm from './TagForm';
import Success from '../Utilities/Messages/Success';
import { width } from '@material-ui/system';
import Error from '../Utilities/Messages/Error';
var randomColor = require('randomcolor');

interface ITagsProps{
    setTagsRequest:Function,
    isSelected: Function,
    handleTag:Function,
    updateAssays:Function
}
const Tags:React.SFC<ITagsProps> = (props) => {
    const {setTagsRequest,isSelected,handleTag,updateAssays} = props
    const [newTagRequest,setNewTagRequest] = React.useState(false)
    const [tags,setTags] = React.useState<Array<ITag>>([]);
    const [success,setSuccess] = React.useState<boolean>(false)
    const [error,setError] = React.useState<string>('')

    React.useEffect(()=>{
       fetchTags()
    },[])

    const fetchTags=()=>{
        BushService.get('/tags')
                   .then((data:Array<ITag>) => {
                       setTags(data)
                    })
    }

     const handleNewTag = (tag:ITag) => {
        setError('')
        setSuccess(false)
        BushService.post('/tags/insertar',tag)
                   .then(()=>{
                       fetchTags()
                       setSuccess(true)
                    })
                    .catch(error => {
                        error.json().then(error=>{
                            setError('Nombre ya existente')
                        })
                    })
                }
                

    const deleteTag = (tag:ITag) => {
        BushService.post(`/tags/eliminar?idTag=${tag.idTag}`)
                    .then(()=>{
                        updateAssays()
                    })
    }
    return (
        <div className="tags-container">
                <div className="tags-header">
                    <a onClick={()=> {
                        setNewTagRequest(false)
                        setSuccess(false)
                        }}>
                        {newTagRequest && <i className="icon-left-open"/>}
                    </a>
                    <div className="tags-title">
                        {newTagRequest? 'Nueva Etiqueta' : 'Etiquetas'}
                    </div>
                    <a onClick={() => {
                        setTagsRequest(false)
                        setSuccess(false)
                        }}>
                        <i className="icon icon-cancel"/>
                    </a>
                </div>
                {success && <Success message="Tag creado"/>}
                {error.length>0 && <Error message={error}/>}
                {!newTagRequest?
                    [tags.map(tag => (
                        <div className="tag">
                            <div className="tag-content" 
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
                            <div className="tag-delete" onClick={()=>deleteTag(tag)}>
                                <i className="icon icon-trash"/>
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