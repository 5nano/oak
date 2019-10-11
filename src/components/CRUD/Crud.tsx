import * as React from "react";
import { IValues } from "../Form/Form";


export interface ICrudViewProps {
    title:string,
    searchUrl: string,
    deleteUrl: string,
    updateUrl: string,
    createUrl: string
    form?: any,
    search?: any
}

const CrudView: React.SFC <ICrudViewProps> = ({
    searchUrl,
    deleteUrl,
    updateUrl,
    createUrl,
    title,
    form: FormComponent,
    search: SearchComponent
}) => {
  
  const [formRequest,setFormRequest] = React.useState(false);

  const handleClick = (e:React.MouseEvent<HTMLElement>) => (
    setFormRequest(!formRequest)
  )

  const submitForm = (values:IValues,setError:Function): Promise<boolean> => {

    return fetch(createUrl, {
      method: "POST",
      mode: 'cors',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).then(response => {
            console.log(response)
            if (!response.ok) throw response
            else return true
    }).catch(error => error.json()
                           .then((error:any) => {
                             console.log(error.message)
                             setError({serverError:error.message})
                             return false;
                           }))
  }

  return (

      <div className="crud-container">
                  <div className="title-wrapper">
                    <img src="../../assets/images/head-icon.png"/>
                    <p>{title}</p>
                  </div>

                  <div className="layout-wrapper">
                      <a className="add-element" onClick={handleClick}/>
                      <SearchComponent searchUrl={searchUrl} deleteUrl={deleteUrl}/>
                  </div> 

                  {formRequest &&
                  <div className="form-wrapper">
                      <div className="form-content">
                          <div className="form-helper">Ingrese los datos</div>
                          <FormComponent submitForm={submitForm}/>                   
                      </div>
                  </div>
                  }
      </div>
 
  );
};

export default CrudView;