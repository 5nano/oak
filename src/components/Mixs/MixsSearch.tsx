import * as React from "react";
import Search from '../Search/Search';
import Criteria from '../Search/Criteria';
import { IComoponentSearchProps } from "../Search/ComponentSearchProps";

const MixsSearch: React.SFC<IComoponentSearchProps> = (props) => {
  
  return (
    <Search
      searchAction={props.searchUrl}
      deleteAction={props.deleteUrl}
      updateAction={props.updateUrl}
      type='mix'
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

export default MixsSearch;