import * as React from "react";
import CropsForm from "./CropsForm";

import CrudView from '../CRUD/Crud';


const Crops: React.SFC = () => {
  
  return (
    <CrudView 
        title= 'Cultivos'
        searchUrl= '/cultivos'
        deleteUrl= '/cultivos/eliminar'
        createUrl= '/cultivos/insertar'
        updateUrl= '/cultivos/modificar'
        form= {CropsForm}
        type="crop"
    />
  );
};

export default Crops;