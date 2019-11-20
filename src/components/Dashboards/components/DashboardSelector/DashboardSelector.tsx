import * as React from "react";
import { DashboardType } from '../../dashboardsTypes/InterfaceDashboardTypes';
import DashboardTypes from "../../DashboardTypes";
import classnames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
  });

interface DashboardSelectorProps {
    dashboardTypes: Array<DashboardType>,
    currentSelection: DashboardType,
    onSelect: (dashboardSelected : DashboardType["id"]) => {},
}

const DashboardSelector: React.FunctionComponent<DashboardSelectorProps> = (props: DashboardSelectorProps) => {
    
    const classes = useStyles(props);
    const [value, setValue] = React.useState(0);
    const handleClick = (event: React.ChangeEvent<any>,newValue:number) => {
      event.preventDefault();
      setValue(newValue)
      props.onSelect(tabs[newValue]);
  }


  const [tabs,setTabs] = React.useState([])

  React.useEffect(()=>{
      let tabs = [];
    props.dashboardTypes.forEach((dashboard,i) => {
        tabs[i] = dashboard.id;
    })
    setTabs(tabs)
  },[])
  return (
    <div className="dashboard-selector">
        <Paper className={classes.root}>
            <Tabs
                value={value}
                onChange={handleClick}
                indicatorColor="primary"
                textColor="primary"
                centered>
                {
                props.dashboardTypes.map((dashboard) =>(
                    <Tab label={dashboard.name}
                    selected={dashboard.id === props.currentSelection.id}/>
                 ))
                }
            </Tabs>
        </Paper>
    </div>
  )
}
        /*{
            props.dashboardTypes.map((dashboard) => {
                return <div className={classnames("tab-wrapper", {selected: dashboard.id === props.currentSelection.id})}>
                    <div className="tab" dash-type={dashboard.id} onClick={handleClick}> { dashboard.name } </div>
                </div>
            })
    </div>
  )
};*/

export default DashboardSelector;