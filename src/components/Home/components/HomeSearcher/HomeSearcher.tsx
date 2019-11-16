import * as React from 'react';
import BushService from '../../../../services/bush'
import { ITag } from '../../../../Interfaces/Tags'
import Autocomplete from '@celebryts/react-autocomplete-tags';
import Button from '../../../Utilities/Buttons/DefaultButton/Button';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton } from '@material-ui/core';

export interface AutocompleteTag{
    label: string,
    value: string
}

interface IHomeSearcherProps {
    search: Function;
    setSelectedTags : Function;
    selectedTags: Array<AutocompleteTag>
}


const HomeSearcher:React.SFC<IHomeSearcherProps> = (props) => {
    const [tags,setTags] = React.useState<Array<AutocompleteTag>>([])
    const [suggestions,setSuggestions] = React.useState<Array<AutocompleteTag>>([])
    const [loading,setLoading] = React.useState<boolean>(true)
    
    const {search,setSelectedTags,selectedTags} = props;

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

    return(
        
        <div className="search-bar-container">
            <Autocomplete
                suggestions={suggestions}
                onAdd={handleAddition}
                onDelete={handleDelete}
                onChange={handleChange}
                className="search-bar"
                allowCreateTag={false}
                saveOnBlur={false}
                placeholder="Buscar por tags..."
                />
            <IconButton>
                <SearchIcon/>
            </IconButton>
        </div>
    )
}

export default HomeSearcher;