import * as React from "react";
import AgrochemicalsForm from './AgrochemicalsForm';
import CrudView from '../CRUD/Crud';
const Agrochemicals: React.SFC = () => {
  
  return (
    <CrudView 
        title="Agroquimicos"
        searchUrl= '/agroquimicos'
        deleteUrl= '/agroquimicos/eliminar'
        createUrl= '/agroquimicos/insertar'
        updateUrl= '/agroquimicos/modificar'
        form= {AgrochemicalsForm}
        type="agrochemical"
    />
  );
};

export default Agrochemicals;