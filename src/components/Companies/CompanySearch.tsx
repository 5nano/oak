import * as React from "react";
import Search from '../Search/Search';
import Criteria from '../Search/Criteria';
import Results from '../Search/Results';
import CompanyForm from "./CompanyForm";

const CompanySearch: React.SFC = () => {
  
  return (
    <Search
      searchAction='https://nanivo-bush.herokuapp.com/bush/companias'
      deleteAction='https://nanivo-bush.herokuapp.com/bush/companias/eliminar'
      title="Companias"
      form={<CompanyForm/>}
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

export default CompanySearch;