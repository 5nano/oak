import * as React from "react";
import CompaniesSearch from './CompaniesSearch';
import CompaniesForm from "./CompaniesForm";

import CrudView from '../CRUD/Crud';


const Companies: React.SFC = () => {
  
  return (
    <CrudView 
        title= 'Comapanias'
        searchUrl= 'https://nanivo-bush.herokuapp.com/companias'
        deleteUrl= 'https://nanivo-bush.herokuapp.com/companias/eliminar'
        createUrl= 'https://nanivo-bush.herokuapp.com/companias/insertar'
        updateUrl= 'https://nanivo-bush.herokuapp.com/companias/actualizar'
        form= {CompaniesForm}
        search= {CompaniesSearch}
    />
  );
};

export default Companies;