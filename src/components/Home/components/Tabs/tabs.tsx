import * as React from 'react'
import { assayState } from '../../Home'

interface ITabsProps{
    assayStates: Array<assayState>,
    handleTab: (tab:assayState) => void
}

const Tabs:React.SFC<ITabsProps> = (props) => {

    const [selectedTab,setSelectedTab] = React.useState('ALL')

    const handleTab = (tab:assayState) => {
        setSelectedTab(tab)
        props.handleTab(tab)
    }
    const {assayStates} = props
    return (
        <div className="home-tabs">
            {assayStates.map(tab => (
                <div className="tab"
                     onClick={()=>handleTab(tab)}
                     style={tab===selectedTab?{backgroundColor:'#6AC1A9',color:'white'}
                                             : {backgroundColor: 'white', color: '#6AC1A9'}}
                     >
                   { (() => { 
                       switch (tab) {
                        case 'ALL':
                            return 'TODOS'
                        case 'ACTIVE':
                            return 'ACTIVOS'
                        case 'FINISHED':
                            return 'TERMINADOS'
                        case 'ARCHIVED':
                            return 'ARCHIVADOS'
                        default:
                            return null;
                    }
                }
                )()}
                </div>
            ))}
        </div>
    )
}

export default Tabs;