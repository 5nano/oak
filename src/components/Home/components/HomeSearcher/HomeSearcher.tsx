import * as React from 'react'

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