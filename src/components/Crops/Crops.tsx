import * as React from "react";
import CropsSearch from './CropsSearch';
import CropsForm from "./CropsForm";

import CrudView from '../CRUD/CrudView';


const Crops: React.SFC = () => {
  
  return (
    <CrudView 
        title= 'Cultivos'
        searchUrl= 'https://nanivo-bush.herokuapp.com/cultivos'
        deleteUrl= 'https://nanivo-bush.herokuapp.com/cultivos/eliminar'
        createUrl= 'https://nanivo-bush.herokuapp.com/cultivos/insertar'
        updateUrl= 'https://nanivo-bush.herokuapp.com/cultivos/actualizar'
        form= {CropsForm}
        search= {CropsSearch}
    />
  );
};

export default Crops;