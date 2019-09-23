import * as React from "react";


export interface ICrudViewProps {
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
    form: FormComponent,
    search: SearchComponent
}) => {
  
  return (
    
    <div>
        {<SearchComponent searchUrl={searchUrl} deleteUrl={deleteUrl}/>}
        {<FormComponent createUrl={createUrl}/>}
    </div>
    
  );
};

export default CrudView;