import * as React from 'react';
import { SearchContext, ISearchContext } from './Search';
import Button from '../Utilities/Buttons/DefaultButton/Button';

const SearchButton:React.SFC = () => {
    return(
        <SearchContext.Consumer>
            {(context:ISearchContext) => (
                <Button title="Actualizar" onClick={context.search}/>
            )}
        </SearchContext.Consumer>
    )
}

export default SearchButton;