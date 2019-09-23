import * as React from "react";
import Search from '../Search/Search';
import Criteria from '../Search/Criteria';
import Results from '../Search/Results';
import CropsForm from "./CropsForm";

const CropsSearch: React.SFC = () => {
  
  return (
    <Search
      searchAction='https://nanivo-bush.herokuapp.com/cultivos'
      deleteAction='https://nanivo-bush.herokuapp.com/cultivos/eliminar'
      title="Cultivos"
      form={<CropsForm/>}
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