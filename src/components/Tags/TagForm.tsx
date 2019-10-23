import * as React from 'react'
import Button from '../Utilities/Buttons/DefaultButton/Button'
import { ITag } from '../../Interfaces/Tags';
import BushService from '../../services/bush';

interface ITagFormProps{
    setNewTagRequest: Function
}
interface ITagFormState{
    idTag:Number,
    name:string,
    description:string
}
class TagForm extends React.Component<ITagFormProps,ITagFormState> {
    constructor(props:ITagFormProps){
        super(props)
        this.state = {
            idTag: null,
            name: '',
            description: ''
        }
    }

    handleNewTag(){
        BushService.post('/tags/insertar',this.state)
                   .then(()=> console.log("insertado"))
    }


    render(){
        return(
            <div className="new-tag-container">
                <input type="text"
                    value={this.state.name}
                    onChange={e=> {
                        this.setState({name:e.currentTarget.value})
                    }}
                    placeholder="Nombre"/>
                <input type="text"
                        value={this.state.description}
                        onChange={e=> {
                            this.setState({description:e.currentTarget.value})
                        }}
                        placeholder="Descripción"/>
                <Button title="Crear"
                        onClick={()=>this.handleNewTag()}/>
                <Button title="Cancelar"
                        onClick={()=>this.props.setNewTagRequest(false)} />
            </div>
        )
    }
}
export default TagForm;