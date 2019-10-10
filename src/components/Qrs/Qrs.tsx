import * as React from 'react'
import ITreatment from '../../Interfaces/ITreatment'
import { buildUrl } from '../Utilities/QueryParamsURLBuilder';
import TreatmentSelector from '../Treatment/TreatmentSelector';
import TreatmentQrs from './TreatmentQr/TreatmentQrs';

  interface IQrsState{
      assayId: string,
      treatments: Array<ITreatment>,
      loading:boolean,
      actualTreatment:ITreatment,
      qrsRequest: boolean
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
            actualTreatment:null,
            qrsRequest:false,
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
                this.setState({treatments:treatments,
                              actualTreatment:treatments[0],
                              loading:false})
        })
    }

    setNewTreatment = (treatmentName:string) => {
        let treatment:ITreatment;
        treatment = this.state.treatments.find(treatment => treatment.name === treatmentName)
        treatment.qrs = [];
       
        fetch(
            buildUrl('https://nanivo-bush.herokuapp.com/tratamiento/QRs',{
                idTreatment:treatment.idTreatment
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
        
            Object.keys(data.experimentsQR).forEach(key=>{
                treatment.qrs.push(data.experimentsQR[key])
            })
            this.setState({actualTreatment:treatment,qrsRequest:true})
        })
        
    }
    
    render(){
        return(
            <div className="qrs-wrapper">
                <div className="qrs-title">
                    Códigos QRs del ensayo
                </div>

                

                {!this.state.loading && this.state.treatments.length>0 &&
                <div className="qrs-selector">
                        <p>Eliga el tratamiento para ver sus QRs</p>
                        <TreatmentSelector treatments={this.state.treatments}
                                           onSelect={this.setNewTreatment.bind(this)}
                                           actualTreatment={this.state.actualTreatment}/>                   
                </div>
                }

                {!this.state.loading && this.state.treatments.length===0 &&
                    <div>
                        Este ensayo no presenta tratamientos
                    </div>
                }

                {this.state.qrsRequest && 
                <TreatmentQrs treatment={this.state.actualTreatment}/>
                }


                
                
            </div>
        )
    }
}

export default Qrs;