import * as React from "react";
import CropsSearch from './CropsSearch';
import CropsForm from "./CropsForm";

import CrudView from '../CRUD/Crud';


const Crops: React.SFC = () => {
  
  return (
    <CrudView 
        title= 'Cultivos'
        searchUrl= '/cultivos'
        deleteUrl= '/cultivos/eliminar'
        createUrl= '/cultivos/insertar'
        updateUrl= '/cultivos/actualizar'
        form= {CropsForm}
        search= {CropsSearch}
    />
  );
};

export default Crops;