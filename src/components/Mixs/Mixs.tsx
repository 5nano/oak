import * as React from "react";


import CrudView from '../CRUD/CrudView';
import MixsForm from "./MixsForm";
import MixsSearch from "./MixsSearch";


const Mixs: React.SFC = () => {
  
  return (
    <CrudView 
        title= 'Mezclas'
        searchUrl= 'https://nanivo-bush.herokuapp.com/mezclas'
        deleteUrl= 'https://nanivo-bush.herokuapp.com/mezclas/eliminar'
        createUrl= 'https://nanivo-bush.herokuapp.com/mezclas/insertar'
        updateUrl= 'https://nanivo-bush.herokuapp.com/mezclas/actualizar'
        form= {MixsForm}
        search= {MixsSearch}
    />
  );
};

export default Mixs;