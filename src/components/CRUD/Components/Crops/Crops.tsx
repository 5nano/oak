import * as React from "react";
import CropsForm from "./CropsForm";

import CrudView from '../../Crud';


const Crops: React.SFC = () => {
  
  return (
    <CrudView 
        title= 'Cultivos'
        searchUrl= '/cultivos'
        deleteUrl= '/cultivos/eliminar?idCrop='
        createUrl= '/cultivos/insertar'
        updateUrl= '/cultivos/modificar'
        form= {CropsForm}
        type="crop"
    />
  );
};

export default Crops;