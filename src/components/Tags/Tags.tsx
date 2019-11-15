import * as React from 'react'
import BushService from '../../services/bush'
import { ITag } from '../../Interfaces/Tags';
import TagForm from './TagForm';
import Success from '../Utilities/Messages/Success';
import Error from '../Utilities/Messages/Error';

import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { IconButton, Button } from '@material-ui/core';
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
                    <IconButton onClick={()=> {
                        if(newTagRequest){
                        setNewTagRequest(false)
                        setSuccess(false)}
                        }}>
                        <ArrowBackIosIcon/>
                    </IconButton>
                    <div className="tags-title">
                        {newTagRequest? 'Nueva Etiqueta' : 'Etiquetas'}
                    </div>
                    <IconButton onClick={() => {
                        setTagsRequest(false)
                        setSuccess(false)
                        }}>
                        <CloseIcon/>
                    </IconButton>
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
                                    <CheckCircleOutlineIcon/>}
                                </div>
                            </div>
                            <div className="tag-delete" onClick={()=>deleteTag(tag)}>
                                <DeleteIcon/>
                            </div>
                        </div>
                            
                        )
                    ),
                    <Button size="large" 
                            color="default"
                            onClick={()=>setNewTagRequest(true)}>
                        Nueva etiqueta
                    </Button>]
                    :
                    <TagForm setNewTagRequest={setNewTagRequest}
                                handleNewTag={handleNewTag}/>
                }
            </div>
    )
}

export default Tags;