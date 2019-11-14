import * as React from 'react'
import {ITreatment} from '../../Interfaces/ITreatment'
import { buildUrl } from '../Utilities/QueryParamsURLBuilder';
import TreatmentSelector from '../Treatments/Components/Selector/TreatmentSelector';
import TreatmentQrs from './TreatmentQr/TreatmentQrs';
import BushService from '../../services/bush';
import Info from '../Utilities/Messages/Info';
import Loader from '../Utilities/Loader/Loader';
import { IEnsayo } from '../../Interfaces/IEnsayo';

  interface IQrsState{
      treatments: Array<ITreatment>,
      loading:boolean,
      actualTreatment:ITreatment,
      assay:IEnsayo
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
            assay:null
        }
    }

    componentDidMount(){
        this.setState({loading:true})
        let idAssay= this.props.match.params.assayId;
        BushService.get(buildUrl('/ensayo/tratamientos',{
            idAssay:idAssay
        })).then((data:Array<ITreatment>) => {
                    this.setState({treatments:data,
                                  actualTreatment:data[0],
                                })
                    BushService.get(`/ensayo?idAssay=${idAssay}`)
                                .then((assayData:IEnsayo) => {
                                    this.setState({assay:assayData})
                                    if(data.length>0)this.setNewTreatment(data[0].name)  
                                    else this.setState({loading:false})
                                })
                    
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

                {this.state.loading && <Loader/>}

                {!this.state.loading &&
                    <div className="qrs-header">
                        <div className="qrs-title">Códigos QR</div>
                        <div className="qrs-content">Ensayo: {this.state.assay.name}</div>
                    </div>
                }

                {!this.state.loading && this.state.treatments.length>0 &&
                <div className="qrs-selector">
                        <p>Elegi el tratamiento para ver sus QRs</p>
                        <TreatmentSelector treatments={this.state.treatments}
                                           onSelect={this.setNewTreatment.bind(this)}
                                           actualTreatment={this.state.actualTreatment}/>                   
                </div>
                }

                {!this.state.loading && this.state.treatments.length==0 &&
                   <div className="info-content">
                       <div className="empty-content-image">
                            <img src="../../../assets/images/tumbleweed.png"/>
                        </div>

                        <div className="info-content-description">
                            Ooops.... Este ensayo no presenta tratamientos
                        </div>
                    </div>
                }

                {!this.state.loading && this.state.actualTreatment!=null &&
                    <TreatmentQrs assay={this.state.assay} treatment={this.state.actualTreatment}/>
                }

            </div>
        )
    }
}

export default Qrs;