import * as React from "react";
import UserSearch from './UserSearch';
import Register from "./Register";

import CrudView from '../CRUD/CrudView';


const Users: React.SFC = () => {
  
  return (
    <CrudView 
        title= 'Usuarios'
        searchUrl= 'https://nanivo-bush.herokuapp.com/usuarios'
        deleteUrl= 'https://nanivo-bush.herokuapp.com/usuarios/eliminar'
        createUrl= 'https://nanivo-bush.herokuapp.com/usuarios/insertar'
        updateUrl= 'https://nanivo-bush.herokuapp.com/usuarios/actualizar'
        form= {Register}
        search= {UserSearch}
    />
  );
};

export default Users;