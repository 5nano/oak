import { IValues } from "./Form";

export interface IRule {
    values: IValues,
    fieldName: string,
    args?: any
  }
  
  export interface IValidation {
    rule: (rule: IRule) => string;
    args?: any;
  }
  
  export interface IValidations{
    validations: IValidation[]
  }
    
export const required = (rule:IRule): string =>
  rule.values[rule.fieldName] === undefined ||
  rule.values[rule.fieldName] === null ||
  rule.values[rule.fieldName] === ""
    ? "Este campo debe completarse"
    : "";

export const maxLength = (rule:IRule): string =>{
  const length = rule.args
  if(rule.values[rule.fieldName] && rule.values[rule.fieldName].length > length)
     return `Este campo no puede exceder ${length} caracteres`
  else return "";

}

