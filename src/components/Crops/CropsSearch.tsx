import * as React from "react";
import Search from '../Search/Search';
import Criteria from '../Search/Criteria';
import Results from '../Search/Results';

const CropsSearch: React.SFC = () => {
  
  return (
    <Search
      action='http://localhost:8080/bush/cultivos'
      render={() => (
        <React.Fragment>
          <div className="alert alert-info" role="alert">
            Busca el cultivo
          </div>
          <Criteria id="main-criteria"
                    label="Buscar por nombre">
          </Criteria>
        </React.Fragment>
      )}
    />
  );
};

export default CropsSearch;