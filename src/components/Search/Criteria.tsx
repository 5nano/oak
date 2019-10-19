import * as React from "react";
import {ISearchContext,SearchContext} from "./Search"

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
}

export const Criteria: React.SFC<ICriteriaProps> = ({
    id,
    label,
    value
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
                </div>
            )}
        </SearchContext.Consumer>
    )
}

export default Criteria;

