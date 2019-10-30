import * as React from "react";


import CrudView from '../../Crud';
import MixsForm from "./MixsForm";


const Mixs: React.SFC = () => {
  
  return (
    <CrudView 
        title= 'Mezclas'
        type="mix"
        searchUrl= '/mezclas'
        deleteUrl= '/mezclas/eliminar?mixtureId='
        createUrl= '/mezclas/insertar'
        updateUrl= '/mezclas/modificar'
        form= {MixsForm}
    />
  );
};

export default Mixs;