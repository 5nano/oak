import * as React from "react";
import CompaniesForm from "./CompaniesForm";

import CrudView from '../CRUD/Crud';


const Companies: React.SFC = () => {
  
  return (
    <CrudView 
        title= 'Comapanias'
        searchUrl= '/companias'
        deleteUrl= '/companias/eliminar'
        createUrl= '/companias/insertar'
        updateUrl= '/companias/modificar'
        form= {CompaniesForm}
        type="companie"
    />
  );
};

export default Companies;