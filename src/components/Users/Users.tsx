import * as React from "react";
import UserForm from "./UserForm";
import UserSearch from './UserSearch';
import CrudView from '../CRUD/Crud';


const Users: React.SFC = () => {
  
  return (
    <CrudView 
        title= 'Usuarios'
        searchUrl= 'https://nanivo-bush.herokuapp.com/usuarios'
        deleteUrl= 'https://nanivo-bush.herokuapp.com/usuarios/eliminar'
        createUrl= 'https://nanivo-bush.herokuapp.com/usuarios/insertar'
        updateUrl= 'https://nanivo-bush.herokuapp.com/usuarios/actualizar'
        form= {UserForm}
        search={UserSearch}
    />
  );
};

export default Users;