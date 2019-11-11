import * as React from 'react'
import { IEnsayo } from '../../../../Interfaces/IEnsayo'
import BushService from '../../../../services/bush'
import { ITag } from '../../../../Interfaces/Tags'
import Autocomplete from '@celebryts/react-autocomplete-tags';
import Button from '../../../Utilities/Buttons/DefaultButton/Button';
import Search from '../../../Search/Search';

interface AutocompleteTag{
    label: string,
    value: string
}

interface IHomeSearcherProps {
    setFilteredAssays: (assays:Array<IEnsayo>) => void;
    setLoading: (value:boolean) => void;
}


const HomeSearcher:React.SFC<IHomeSearcherProps> = (props) => {
    const [tags,setTags] = React.useState<Array<AutocompleteTag>>([])
    const [selectedTags,setSelectedTags] = React.useState<Array<AutocompleteTag>>([])
    const [suggestions,setSuggestions] = React.useState<Array<AutocompleteTag>>([])
    const [loading,setLoading] = React.useState<boolean>(true)
    React.useEffect(()=> {
        setLoading(true)
        BushService.get('/tags')
                    .then((data:Array<ITag>) => {
                        let tags: Array<AutocompleteTag> = []
                        data.forEach(tag => {
                            let newTag:AutocompleteTag = {
                                label:tag.name,
                                value:tag.name
                            }
                            tags.push(newTag)
                        })
                        setTags(tags)
                        setSuggestions(tags)
                        setLoading(false)
                    })
    },[])

    const handleAddition = (tag:AutocompleteTag) => {
        let newTags = [].concat(selectedTags,tag)
        setSelectedTags(newTags)
    }

    const handleDelete = (deletedTags:Array<string>,remainedTags:Array<string>)=>{
        let deletedTagValue = deletedTags.pop();
        let newTags = selectedTags.filter(tag => tag.value != deletedTagValue);
        setSelectedTags(newTags)
    }

    const handleChange = (value:string) => {
        let stringSearch = value.trim().toLowerCase();
        let newSuggestions = tags.filter(tag => tag.value.trim().toLowerCase().match(stringSearch))
        setSuggestions(newSuggestions)
    }

    const searchAssays = () => {
        props.setLoading(true)
        let tags = selectedTags.map(tag => {return tag.value})
        console.log(tags)
        BushService.post('/tags/ensayos',tags)
                    .then((data:Array<IEnsayo>) => {
                        props.setFilteredAssays(data)
                        props.setLoading(false)
                    })
    }

    return(
        
        <div className="assay-search">
        <Autocomplete
            suggestions={suggestions}
            onAdd={handleAddition}
            onDelete={handleDelete}
            onChange={handleChange}
            className="search-bar"
            allowCreateTag={false}
            saveOnBlur={false}
            placeholder="Busca por tags..."
            />
        <Button title="Buscar" onClick={()=> searchAssays()}/>
        </div>
    )
}

export default HomeSearcher;