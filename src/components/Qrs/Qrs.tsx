import * as React from 'react'
import {ITreatment} from '../../Interfaces/ITreatment'
import { buildUrl } from '../Utilities/QueryParamsURLBuilder';
import TreatmentSelector from '../Treatments/Components/Selector/TreatmentSelector';
import TreatmentQrs from './TreatmentQr/TreatmentQrs';
import BushService from '../../services/bush';
import Info from '../Utilities/Messages/Info';
import Loader from '../Utilities/Loader/Loader';

  interface IQrsState{
      treatments: Array<ITreatment>,
      loading:boolean,
      actualTreatment:ITreatment,
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
            treatments:[],
            loading:true,
            actualTreatment:null,
        }
    }

    componentDidMount(){
        this.setState({loading:true})
        
        BushService.get(buildUrl('/ensayo/tratamientos',{
            idAssay:this.props.match.params.assayId
        })).then((data:Array<ITreatment>) => {
                    this.setState({treatments:data,
                                  actualTreatment:data[0],
                                })
                    return data[0]
                })
                .then(treatment => {
                    this.setNewTreatment(treatment.name)
                })
            
    }

    setNewTreatment = (treatmentName:string):Promise<void> => {
        this.setState({loading:true})
        let treatment:ITreatment;
        treatment = this.state.treatments.find(treatment => treatment.name === treatmentName)
        treatment.qrs = [];
       
       return BushService.get(buildUrl('/tratamiento/QRs',{
            idTreatment:treatment.idTreatment
        }))
          .then(data => {
            Object.keys(data.experimentsQR).forEach(key=>{
                treatment.qrs.push(data.experimentsQR[key])
            })
            this.setState({actualTreatment:treatment,loading:false})
        })
        
    }
    
    render(){
        return(
            <div className="qrs-wrapper">
                <div className="qrs-title">
                    Códigos QRs del ensayo {this.props.match.params.assayId}
                </div>

                {this.state.loading && <Loader/>}

                {!this.state.loading && this.state.treatments.length>0 &&
                <div className="qrs-selector">
                        <p>Elegi el tratamiento para ver sus QRs</p>
                        <TreatmentSelector treatments={this.state.treatments}
                                           onSelect={this.setNewTreatment.bind(this)}
                                           actualTreatment={this.state.actualTreatment}/>                   
                </div>
                }

                {!this.state.loading && this.state.treatments.length===0 &&
                   <Info message="Este ensayo no presenta tratamientos"/>
                }

                {!this.state.loading && 
                    <TreatmentQrs idAssay={this.props.match.params.assayId} treatment={this.state.actualTreatment}/>
                }

            </div>
        )
    }
}

export default Qrs;