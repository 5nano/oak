import * as React from "react";


export interface ICrudViewProps {
    title:string,
    searchUrl: string,
    deleteUrl: string,
    updateUrl: string,
    createUrl: string
    form: any,
    search: any
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

 


  return (

      <div className="crud-container">
                  <div className="search-wrapper">
                    <div className="title-wrapper">
                      <img src="../../assets/images/head-icon.png"/>
                      <p>{title}</p>
                    </div>
                    <SearchComponent searchUrl={searchUrl} deleteUrl={deleteUrl}/>
                  </div>
                  
                  <div className="register-wrapper">
                    <button className="add-element" onClick={handleClick}/>
                    
                    {formRequest && <FormComponent createUrl={createUrl}/>}
                  </div>
      </div>
 
  );
};

export default CrudView;