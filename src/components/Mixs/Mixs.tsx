import * as React from "react";


import CrudView from '../CRUD/Crud';
import MixsForm from "./MixsForm";
import MixsSearch from "./MixsSearch";


const Mixs: React.SFC = () => {
  
  return (
    <CrudView 
        title= 'Mezclas'
        searchUrl= '/mezclas'
        deleteUrl= '/mezclas/eliminar'
        createUrl= '/mezclas/insertar'
        updateUrl= '/mezclas/modificar'
        form= {MixsForm}
        search= {MixsSearch}
    />
  );
};

export default Mixs;