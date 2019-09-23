import * as React from "react";
import Search from '../Search/Search';
import Criteria from '../Search/Criteria';
import Results from '../Search/Results';
import AgrochemicalsForm from "./AgrochemicalsForm";

const AgrochemicalsSearch: React.SFC = () => {
  
  return (
    <Search
      searchAction='https://nanivo-bush.herokuapp.com/agroquimicos'
      deleteAction='https://nanivo-bush.herokuapp.com/agroquimicos/eliminar'
      title="Agroquimicos"
      form={<AgrochemicalsForm/>}
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

export default AgrochemicalsSearch;