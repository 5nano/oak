import * as React from "react";

import AgrochemicalsForm from './AgrochemicalsForm';
import AgrochemicalsSearch from './AgrochemicalsSearch';

import CrudView from '../CRUD/Crud';


const Agrochemicals: React.SFC = () => {
  
  return (
    <CrudView 
        title="Agroquimicos"
        searchUrl= 'https://nanivo-bush.herokuapp.com/agroquimicos'
        deleteUrl= 'https://nanivo-bush.herokuapp.com/agroquimicos/eliminar'
        createUrl= 'https://nanivo-bush.herokuapp.com/agroquimicos/insertar'
        updateUrl= 'https://nanivo-bush.herokuapp.com/agroquimicos/actualizar'
        form= {AgrochemicalsForm}
        search= {AgrochemicalsSearch}
    />
  );
};

export default Agrochemicals;