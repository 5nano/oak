import * as React from "react";
import {IErrors, ISearchContext,SearchContext} from "./Search"
import { FormContext } from "../Form/Form";

export interface ICriteriaSearch {
    onSearch: (criteria:string) => any;
}

export interface ICriteriaProps {
    /* The unique field name */
  id: string;

  /* The label text for the field */
  label?: string;

  /* The field value */
  value?: any;

  onSearch: (e: React.MouseEvent<HTMLElement>) => Promise<void>;
}

export const Criteria: React.SFC<ICriteriaProps> = ({
    id,
    label,
    value,
    onSearch
}) => {
    
    return (
        <SearchContext.Consumer>
            {(context: ISearchContext) => (
                <div>
                    <input id={id}
                        type="search" 
                        placeholder={label}
                        value={value}
                        onChange={
                            (e: React.FormEvent<HTMLInputElement>) =>
                              context.setValues({ [id]: e.currentTarget.value }) 
                          }/>
                    <button onClick={onSearch}>Go</button>
                </div>
            )}
        </SearchContext.Consumer>
    )
}

export default Criteria;

