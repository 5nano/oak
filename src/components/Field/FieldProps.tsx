import { IValidation } from "../Form/Validation";

/* The available editors for the field */
type Editor = "textbox" |
              "checkbox"| 
              "multilinetextbox" | 
              "dropdown" | 
              "password";


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

  validation?: IValidation;
}
