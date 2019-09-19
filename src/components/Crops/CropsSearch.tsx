import * as React from "react";
import Search from '../Search/Search';
import Criteria from '../Search/Criteria';
import Results from '../Search/Results';

const CropsSearch: React.SFC = () => {
  
  return (
    <Search
      searchAction='http://localhost:8080/bush/cultivos'
      deleteAction=''
      title="Cultivos"
      render={() => (
        <React.Fragment>
        
          <Results titles={['Nombre','Descripcion']}/>
          <Criteria id="main-criteria"
                    label="Buscar por nombre">
          </Criteria>
          
        </React.Fragment>
      )}
    />
  );
};

export default CropsSearch;