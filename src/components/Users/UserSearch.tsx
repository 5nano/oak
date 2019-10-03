import * as React from "react";
import Search from '../Search/Search';
import Criteria from '../Search/Criteria';
import Results from '../Search/Results';
import { IComoponentSearchProps } from "../Search/ComponentSearchProps";

const UsersSearch: React.SFC<IComoponentSearchProps> = (props) => {
  
  return (
    <Search
      searchAction={props.searchUrl}
      deleteAction={props.deleteUrl}
      render={() => (
        <React.Fragment>
        
          <Results type='user'/>
          <Criteria id="main-criteria"
                    label="Buscar por nombre">
          </Criteria>
          
        </React.Fragment>
      )}
    />
  );
};

export default UsersSearch;