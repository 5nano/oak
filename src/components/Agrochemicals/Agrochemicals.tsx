import * as React from "react";

import AgrochmicalsForm from './AgrochemicalsForm';
import AgrochemicalsSearch from './AgrochemicalsSearch';

import CrudView from '../CRUD/CrudView';


const Agrochemicals: React.SFC = () => {
  
  return (
    <CrudView 
        searchUrl= 'https://nanivo-bush.herokuapp.com/agroquimicos'
        deleteUrl= 'https://nanivo-bush.herokuapp.com/agroquimicos/eliminar'
        createUrl= 'https://nanivo-bush.herokuapp.com/agroquimicos/insertar'
        updateUrl= 'https://nanivo-bush.herokuapp.com/agroquimicos/actualizar'
        form= {AgrochmicalsForm}
        search= {AgrochemicalsSearch}
    />
  );
};

export default Agrochemicals;