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

    handleChange = (e,fieldName:string) => {
        this.setState({
            tag: {...this.state.tag, [fieldName]:e.currentTarget.value}
        })
    }

    render(){
        return(
            <div className="new-tag-container">
                <div className="new-tag-form">
                    <input type="text"
                        value={this.state.tag.name}
                        onChange={e=> this.handleChange(e,'name')}
                        placeholder="Nombre"/>
                    <input type="text"
                            value={this.state.tag.description}
                            onChange={e=> this.handleChange(e,'description')}
                            placeholder="Descripción"/>
                </div>
                <Button title="Crear"
                        className='tag-form-button'
                        onClick={()=>this.props.handleNewTag(this.state.tag)}/>
            </div>
        )
    }
}
export default TagForm;