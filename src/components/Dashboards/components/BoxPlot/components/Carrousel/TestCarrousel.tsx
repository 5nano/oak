import * as React from 'react';
import { ITest } from '../../../../../../Interfaces/Experimento';
import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';
import BushService from '../../../../../../services/bush';
import Loader from '../../../../../Utilities/Loader/Loader';
import { Slide } from 'material-auto-rotating-carousel';
interface ITestCarrouselProps{
    experimentId: Number;
    treatmentName:string
}

const TestCarrousel:React.SFC<ITestCarrouselProps> = (props) => {
    
    const [tests,setTests] = React.useState<Array<ITest>>([])
    const [loading,setLoading] = React.useState<boolean>(true)

    const [open,setOpen] = React.useState<boolean>(false)
   
    React.useEffect(()=>{
        console.log(props)
      BushService.get(`/experiment/points?experimentId=${props.experimentId}`)
                .then((tests:Array<ITest>) => {
                    if(tests.length > 0) { //Otherwise AutoRotatingCarousel will throw error
                        setTests(tests)
                        setLoading(false)
                        setOpen(true)
                    }
                })
    },[])
    
    return(
        <AutoRotatingCarousel
            open={open}
            onClose={()=>setOpen(false)}
            autoplay={false}
            >
            {tests.map(test => (
                <Slide 
                    media={ <img style={{marginTop:'30px'}} src={test.pathImage}/>}
                    title={
                        <div className="carrousel-title">
                        <p>Tratamiento {props.treatmentName} - Experimento {props.experimentId}</p>
                        <p>Fecha de captura: {new Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(Date.parse(test.instant))}</p>
                        </div>
                    }
                    subtitle={
                    <div className="test-content">
                        <div className="content-row">
                            <h4>Altura:</h4><p>{test.height} px</p>
                        </div>
                        <div className="content-row">
                            <h4>Ancho:</h4><p>{test.width} px</p>
                        </div>
                        <div className="content-row">
                            <h4>Area Foliar:</h4><p>{test.area} px</p>
                        </div>
                    </div>
                    }
                    style={{backgroundColor: '#6AC1A9'}}
                    mediaBackgroundStyle={{backgroundColor: '#6AC1A9'}}
                />
            ))}
        </AutoRotatingCarousel>
    )
}

export default TestCarrousel;