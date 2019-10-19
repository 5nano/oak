import { IValues } from "./Form";

export interface IComponentFormProps{
    submitForm: (values:IValues)=>Promise<boolean>;
  }