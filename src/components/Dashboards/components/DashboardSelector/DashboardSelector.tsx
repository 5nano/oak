import * as React from "react";
import { DashboardType } from '../../dashboardsTypes/InterfaceDashboardTypes';
import DashboardTypes from "../../DashboardTypes";
import classnames from 'classnames';

import { makeStyles, createStyles, withStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
    tabs: {
        justifyContent:'space-around',
    }
  });

interface DashboardSelectorProps {
    dashboardTypes: Array<DashboardType>,
    currentSelection: DashboardType,
    onSelect: (dashboardSelected : DashboardType["id"]) => {},
}
interface StyledTabsProps {
    value: number;
    onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
  }
  
  const StyledTabs = withStyles({
    indicator: {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      '& > div': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: '#6AC1A9',
      },
    },
  })((props: StyledTabsProps) => <Tabs {...props}  centered TabIndicatorProps={{ children: <div /> }} />);
  
  interface StyledTabProps {
    label: string;
  }
  
  const StyledTab = withStyles((theme: Theme) =>
    createStyles({
      root: {
        textTransform: 'none',
        color: '#6AC1A9',
        fontWeight: 600,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        '&:focus': {
          opacity: 1,
        },
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif;'
      },
    }),
  )((props: StyledTabProps) => <Tab disableRipple {...props} />);


const DashboardSelector: React.FunctionComponent<DashboardSelectorProps> = (props: DashboardSelectorProps) => {
    
    const classes = useStyles(props);
    const currentSelection = props.dashboardTypes.indexOf(props.currentSelection);
    const handleClick = (event: React.ChangeEvent<any>,newValue:number) => {
      event.preventDefault();
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
            <StyledTabs
                value={currentSelection}
                onChange={handleClick}>
                {
                props.dashboardTypes.map((dashboard) => (
                    <StyledTab label={dashboard.name} />
                 ))
                }
            </StyledTabs>
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