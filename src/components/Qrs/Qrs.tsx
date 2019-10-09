import * as React from 'react'
import ITreatment from '../Assay/components/ITreatment'
import { buildUrl } from '../Utilities/QueryParamsURLBuilder';
import TreatmentSelector from '../Treatment/TreatmentSelector';

  interface IQrsState{
      assayId: string,
      treatments: Array<ITreatment>,
      loading:boolean
  }
  
  interface IQrsProps{
      match: {
          params: {assayId: string},
      },
  }

class Qrs extends React.Component<IQrsProps,IQrsState> {

    constructor(props:IQrsProps){
        super(props)

        this.state = {
            assayId:props.match.params.assayId,
            treatments:[],
            loading:true,
        }
    }

    componentDidMount(){
        var treatments: ITreatment[] = [];
        
        fetch(
            buildUrl('https://nanivo-bush.herokuapp.com/ensayo/tratamientos',{
                idAssay:this.props.match.params.assayId
            }), {
            method: "GET",
            mode: 'cors',
            headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
            }
        }).then(response => response.json())
          .then(data => {
              console.log(data)
                Object.keys(data).forEach(key => {
                    let treatment:ITreatment={
                        idAssay:data[key].idAssay,
                        idTreatment:data[key].idTreatment,
                        idMixture:data[key].idMixture,
                        idAgrochemical:data[key].idAgrochemical,
                        name:data[key].name,
                        description:data[key].description,
                        experimentsLength: data[key].experimentsLength
                    }
                    treatments.push(treatment)
                })
                this.setState({treatments:treatments,loading:false})
        })
    }
    
    render(){
        return(
            <div className="qr-wrapper">
                {!this.state.loading && 
                    <TreatmentSelector treatments={this.state.treatments}/>                   
                }
            </div>
        )
    }
}

export default Qrs;