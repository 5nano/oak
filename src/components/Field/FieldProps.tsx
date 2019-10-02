/* The available editors for the field */
type Editor = "textbox" | 
              "password" |
              "multilinetextbox" | 
              "dropdown" | 
              "checkbox" |
              "custom";

export interface IFieldProps {
  /* The unique field name */
  id: string;

  /* The label text for the field */
  label?: string;

  /* The editor for the field */
  editor?: Editor;

  /* The drop down items for the field */
  options?: string[];

  /* The field value */
  value?: any;

  custom?: React.SFC;

  validation?: IValidation;
}

export interface IValidation {
  rule: (values: {
    [key: string]: any;
}, fieldName: string, args: any) => string;
  args?: any;
}