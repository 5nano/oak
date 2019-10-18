import * as React from 'react'
import Button from '../../../Utilities/Buttons/DefaultButton/Button'

const HomeSearcher:React.SFC = () => {
    return(
        <div className="assay-searcher">
            <input className="input-search"
                    type="text" 
                    placeholder="Buscar ensayos"/>
        </div>
    )
}

export default HomeSearcher;