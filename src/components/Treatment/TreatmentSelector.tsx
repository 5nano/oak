import * as React from 'react'
import ITreatment from '../Assay/components/ITreatment';
interface TreatmentSelectorProps{
    treatments: Array<ITreatment>,
    onSelect:Function,
    actualTreatment: ITreatment
}
const TreatmentSelector:React.SFC<TreatmentSelectorProps> = (props) => {

    const {treatments, onSelect, actualTreatment} = props;

    return(
        <select   id={actualTreatment.idTreatment.toString()}
                  key={actualTreatment.name}
                  name={actualTreatment.name}
                  value={actualTreatment.name}
                  onChange={
                    (e: React.FormEvent<HTMLSelectElement>) =>
                    {  e.preventDefault();
                      onSelect(e.currentTarget.value)} 
                  }
                >
                  <option value='' selected disabled hidden/>
                  {treatments &&
                    treatments.map(treatment => {return treatment.name})
                               .map(treatmentName => (
                                <option key={treatmentName} value={treatmentName}>
                                    {treatmentName}
                                </option>
                    ))}
                </select>
    )
}

export default TreatmentSelector;