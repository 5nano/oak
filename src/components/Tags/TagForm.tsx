import * as React from 'react'
import Button from '../Utilities/Buttons/DefaultButton/Button'
import { ITag } from '../../Interfaces/Tags';
import BushService from '../../services/bush';

interface ITagFormProps{
    setNewTagRequest: Function
    handleNewTag:Function
}
interface ITagFormState{
    tag:ITag
}
class TagForm extends React.Component<ITagFormProps,ITagFormState> {
    constructor(props:ITagFormProps){
        super(props)
        this.state = {
            tag: {
                idTag:null,
                name:'',
                description:''
            }
        }
    }

    render(){
        return(
            <div className="new-tag-container">
                <div className="new-tag-form">
                    <input type="text"
                        value={this.state.tag.name}
                        onChange={e=> {
                            this.setState(prevState=> {
                                let tag = Object.assign({},prevState.tag)
                                tag.name = e.currentTarget.value
                                return {tag}
                            })
                        }}
                        placeholder="Nombre"/>
                    <input type="text"
                            value={this.state.tag.description}
                            onChange={e=> {
                                this.setState(prevState=> {
                                    let tag = Object.assign({},prevState.tag)
                                    tag.description = e.currentTarget.value
                                    return {tag}
                                })
                            }}
                            placeholder="Descripción"/>
                </div>
                <Button title="Crear"
                        className='tag-form-button'
                        onClick={()=>this.props.handleNewTag(this.state.tag)}/>
                <Button title="Cancelar"
                        className='tag-form-button'
                        onClick={()=>this.props.setNewTagRequest(false)} />
            </div>
        )
    }
}
export default TagForm;