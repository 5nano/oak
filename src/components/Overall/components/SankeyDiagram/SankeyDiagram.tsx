import * as React from 'react';
import BushService from '../../../../services/bush';

interface SankeyDiagram{
}

interface ISankeyDiagramProps{

}

interface ISankeyDiagramState{
    sankeyDiagram:SankeyDiagram
}

class SankeyDiagram extends React.Component<ISankeyDiagramProps|ISankeyDiagramState> {

    constructor(props){
        super(props)
        this.state = {
            sankeyDiagram:null
        }
    }

    componentDidMount(){
        BushService.get('/metricas/ensayos/sankey')
                    .then(data=> {
                        console.log(data)
                    })
    }

    render(){
        return (
            <div>

            </div>

        )
    }
}

export default SankeyDiagram;