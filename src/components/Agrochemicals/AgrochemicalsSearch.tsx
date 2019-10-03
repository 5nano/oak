import * as React from "react";
import Search from '../Search/Search';
import Criteria from '../Search/Criteria';
import Results from '../Search/Results';
import Item from "../Search/components/Item";

export interface IAgrochemicalSearchProps {
    searchUrl: string,
    deleteUrl: string,
}

const AgrochemicalsSearch: React.SFC<IAgrochemicalSearchProps> = (props) => {
  
  return (
    <Search
      searchAction={props.searchUrl}
      deleteAction={props.deleteUrl}
      render={() => (
        <React.Fragment>
        
          <Results type='agrochemical' />
          <Criteria id="main-criteria"
                    label="Buscar por nombre">
          </Criteria>
          
        </React.Fragment>
      )}
    />
  );
};

export default AgrochemicalsSearch;