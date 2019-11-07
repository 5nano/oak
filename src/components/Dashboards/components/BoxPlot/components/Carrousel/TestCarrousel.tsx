import * as React from 'react';
import { ITest } from '../../../../../../Interfaces/Experimento';
import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';
import BushService from '../../../../../../services/bush';
import Loader from '../../../../../Utilities/Loader/Loader';
import { Slide } from 'material-auto-rotating-carousel';
interface ITestCarrouselProps{
    experimentId: Number;
}

const TestCarrousel:React.SFC<ITestCarrouselProps> = (props) => {
    
    const [tests,setTests] = React.useState<Array<ITest>>([])
    const [loading,setLoading] = React.useState<boolean>(true)
   
    React.useEffect(()=>{
      BushService.get(`/experiment/points?experimentId=${props.experimentId}`)
                .then((tests:Array<ITest>) => {
                  setTests(tests)
                  setLoading(false)
                })
    },[])
    
    return(
        <AutoRotatingCarousel
            open={!loading}
            onClose={()=>setLoading(true)}
            autoplay={false}
            >

            {tests.map(test => (
                <Slide 
                    media={ <img src={test.pathImage}/>}
                    title={new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(Date.parse(test.instant))}
                    subtitle={
                    <div className="test-content">
                        <div className="content-row">
                            <h4>Altura:</h4><p>{test.height} mm</p>
                        </div>
                        <div className="content-row">
                            <h4>Ancho:</h4><p>{test.width} mm</p>
                        </div>
                        <div className="content-row">
                            <h4>Area Foliar:</h4><p>{test.area} mm2</p>
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