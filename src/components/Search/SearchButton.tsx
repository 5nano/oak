import * as React from 'react';
import { SearchContext, ISearchContext } from './Search';

const SearchButton:React.SFC = () => {
    return(
        <SearchContext.Consumer>
            {(context:ISearchContext) => (
                <button onClick={context.search}>Buscar</button>

            )}
        </SearchContext.Consumer>
    )
}

export default SearchButton;