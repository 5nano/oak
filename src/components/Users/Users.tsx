import * as React from "react";
import UserForm from "./UserForm";
import CrudView from '../CRUD/Crud';


const Users: React.SFC = () => {
  
  return (
    <CrudView 
        title= 'Usuarios'
        searchUrl= '/usuarios'
        deleteUrl= '/usuarios/eliminar'
        createUrl= '/usuarios/insertar'
        updateUrl= '/usuarios/modificar'
        form= {UserForm}
        type="user"
            />
  );
};

export default Users;