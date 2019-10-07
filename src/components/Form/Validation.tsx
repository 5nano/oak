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
    


const required = (rule:IRule): string =>
  rule.values[rule.fieldName] === undefined ||
  rule.values[rule.fieldName] === null ||
  rule.values[rule.fieldName] === ""
    ? "Este campo debe completarse"
    : "";

const maxLength = (rule:IRule): string =>{
  const length = rule.args
  if(rule.values[rule.fieldName] && rule.values[rule.fieldName].length > length)
     return `Este campo no puede exceder ${length} caracteres`
  else return "";

}

const isNumber = (rule:IRule): string =>
  rule.values[rule.fieldName] &&
  rule.values[rule.fieldName].search(
    /^-?[0-9]*$/
  )
   ? `Este campo debe tener un valor númerico`
   :"";

const isEmail = (rule:IRule): string =>
  rule.values[rule.fieldName] &&
  rule.values[rule.fieldName].search(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  )
    ? "Debe ingresar un correo electrónico"
    : "";

export const requiredValidation:IValidation ={
  rule:required
}

export const maxLengthValidation = (length:Number):IValidation => {
  return {
    rule:maxLength,
    args:length
  }
}

export const isNumberValidation:IValidation = {
  rule:isNumber
}

export const isEmailValidation:IValidation = {
  rule:isEmail
}

