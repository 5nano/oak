import * as React from "react";
import Search from '../Search/Search';
import Criteria from '../Search/Criteria';
import Results from '../Search/Results';

export interface ICropsSearchProps{
  searchUrl: string,
  deleteUrl: string,
}

const CropsSearch: React.SFC<ICropsSearchProps> = (props) => {
  
  return (
    <Search
      searchAction={props.searchUrl}
      deleteAction={props.deleteUrl}
      render={() => (
        <React.Fragment>
        
          <Results/>
          <Criteria id="main-criteria"
                    label="Buscar por nombre">
          </Criteria>
          
        </React.Fragment>
      )}
    />
  );
};

export default CropsSearch;