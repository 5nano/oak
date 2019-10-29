import * as React from 'react'
import { IEnsayo } from '../../../../Interfaces/IEnsayo'
import BushService from '../../../../services/bush'
import { ITag } from '../../../../Interfaces/Tags'

interface IHomeSearcherProps {
    assays:Array<IEnsayo>,
    setFilteredAssays:Function
}
const HomeSearcher:React.SFC<IHomeSearcherProps> = (props) => {
    const [stringSearch,setStringSearch] = React.useState<string>('')
    const {assays,setFilteredAssays} = props;
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
       const stringSearch:string = event.currentTarget.value.trim().toLowerCase(); 
       console.log(stringSearch) 
       setStringSearch(stringSearch);

        const filteredAssays = assays.filter(function(assay){
            console.log(assay.tags.length)
            if(assay.tags.length===0) return false
            else return assay.tags.some(tag=>tag.name.toLowerCase().match(stringSearch))
        })

        setFilteredAssays(stringSearch.length > 0?filteredAssays:assays)
    }

    return(
        <div className="assay-searcher">
            <input className="input-search"
                   type="text" 
                   value={stringSearch}
                   onChange={handleChange}
                   placeholder="Buscar por tag..."/>
        </div>
    )
}

export default HomeSearcher;