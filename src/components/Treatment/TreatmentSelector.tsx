import * as React from 'react'
import ITreatment from '../Assay/components/ITreatment';
interface TreatmentSelectorProps{
    treatments: Array<ITreatment>
}
const TreatmentSelector:React.SFC<TreatmentSelectorProps> = (props) => {

    const [treatment,setTreatment] = React.useState(props.treatments[0])
    
    const {treatments} = props;

    const setNewTreatment = (treatmentName:string) => {
        let treatment:ITreatment;
        treatment = treatments.find(treatment => treatment.name === treatmentName)
        setTreatment(treatment)
    }

    return(
        <select   id={treatment.idTreatment.toString()}
                  key={treatment.name}
                  name={treatment.name}
                  value={treatment.name}
                  onChange={
                    (e: React.FormEvent<HTMLSelectElement>) =>
                    {  e.preventDefault();
                      setNewTreatment(e.currentTarget.value)} 
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