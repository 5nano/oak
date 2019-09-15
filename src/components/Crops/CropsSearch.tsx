import * as React from "react";
import Search from '../Search/Search';
import Criteria from '../Search/Criteria';
import Results from '../Search/Results';

const CropsSearch: React.SFC = () => {
  
  return (
    <Search
      searchAction='http://localhost:8080/bush/cultivos'
      deleteAction=''
      render={() => (
        <React.Fragment>
          <div className="alert alert-info" role="alert">
            Busca el cultivo
          </div>
          <Criteria id="main-criteria"
                    label="Buscar por nombre">
          </Criteria>
          <Results titles={['name','description']}/>
        </React.Fragment>
      )}
    />
  );
};

export default CropsSearch;