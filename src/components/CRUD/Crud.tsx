import * as React from "react";
import { IValues } from "../Form/Form";
import BushService from '../../services/bush';
import Button from "../Utilities/Buttons/DefaultButton/Button";


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

  const showForm = () => (
    setFormRequest(true)
  )
  const showSearch = () => {
    setFormRequest(false)
  }

  const submitForm = (values:IValues,setError:Function): Promise<boolean> => {

    return BushService.post(createUrl, values)
      .then(() => true)
      .catch(error => error.json()
          .then((error:any) => {
            console.log(error.message)
            setError({serverError:error.message})
            return false;
          })
      )
  }

  return (

      <div className="crud-container">
                  <div className="crud-title">
                    {title}
                  </div>

                  {!formRequest?
                    <div className="layout-wrapper">
                        <SearchComponent searchUrl={searchUrl} deleteUrl={deleteUrl}/>
                        <div className="form-request">
                          <Button title={`Agregar ${title.substring(0,title.length - 1).toLowerCase()} `}
                                  onClick={showForm}
                                  />
                        </div>
                    </div> 
                    :
                    <div className="layout-wrapper">
                            <FormComponent submitForm={submitForm}/>                   
                            <div className="form-return">
                              <Button title="Volver"
                                      onClick={showSearch}
                                      />
                            </div>
                    </div>
                  }
      </div>
 
  );
};

export default CrudView;