import * as React from 'react'
import Button from '../Utilities/Buttons/DefaultButton/Button'
import { ITag } from '../../Interfaces/Tags';
import {BlockPicker} from 'react-color';

interface ITagFormProps{
    setNewTagRequest: Function
    handleNewTag:Function
}
interface ITagFormState{
    tag:ITag,
    error:string
}
class TagForm extends React.Component<ITagFormProps,ITagFormState> {
    constructor(props:ITagFormProps){
        super(props)
        this.state = {
            tag: {
                name:'',
                description:'',
                color:'#000000'
            },
            error: ''
        }
    }

    handleChange = (e,fieldName:string) => {
        this.setState({
            tag: {...this.state.tag, [fieldName]:e.currentTarget.value}
        })
    }

    handleColorChange = (color:any) => {
        this.setState({
            tag: {...this.state.tag,color:color.hex}
        })
    }

    handleNewTag = () => {
        this.setState({error:''})
        if(this.state.tag.name === '') this.setState({error:'Ingresa un nombre'})
        else this.props.handleNewTag(this.state.tag)
    }

    render(){
        return(
            <div className="new-tag-container">
                <div className="new-tag-form">
                    <input type="text"
                        value={this.state.tag.name}
                        onChange={e=> this.handleChange(e,'name')}
                        placeholder="Nombre"
                        style={this.state.error.length>0?{borderColor:'#FF0000'}:{}}/>

                        
                    <input type="text"
                            value={this.state.tag.description}
                            onChange={e=> this.handleChange(e,'description')}
                            placeholder="Descripción"
                            />
                    <div className="color-picker">
                    <BlockPicker
                        color={this.state.tag.color}
                        onChangeComplete={this.handleColorChange}/>   
                     </div>
                </div>
                <Button title="Crear"
                        className='tag-form-button'
                        onClick={()=>this.handleNewTag()}/>
            </div>
        )
    }
}
export default TagForm;