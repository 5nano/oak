import * as React from "react";
import Search from '../Search/Search';
import Criteria from '../Search/Criteria';
import Results from '../Search/Results';
import { IComoponentSearchProps } from "../Search/ComponentSearchProps";


const AgrochemicalsSearch: React.SFC<IComoponentSearchProps> = (props) => {
  
  return (
    <Search
      searchAction={props.searchUrl}
      deleteAction={props.deleteUrl}
      type='agrochemical'
      render={() => (
        <React.Fragment>
          <Criteria id="main-criteria"
                    label="Buscar por nombre">
          </Criteria>
        </React.Fragment>
      )}
    />
  );
};

export default AgrochemicalsSearch;