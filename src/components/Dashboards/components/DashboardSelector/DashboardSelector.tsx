import * as React from "react";
import { DashboardType } from '../../dashboardsTypes/InterfaceDashboardTypes';
import DashboardTypes from "../../DashboardTypes";
import classnames from 'classnames';

interface DashboardSelectorProps {
    dashboardTypes: Array<DashboardType>,
    currentSelection: DashboardType,
    onSelect: (dashboardSelected : DashboardType["id"]) => {},
}

const DashboardSelector: React.FunctionComponent<DashboardSelectorProps> = (props: DashboardSelectorProps) => {
  const handleClick = (event: React.ChangeEvent<any>) => {
      event.preventDefault();
      props.onSelect(event.target.attributes["dash-type"].nodeValue);
  }

  return (
    <div className="dashboard-selector">
        {
            props.dashboardTypes.map((dashboard) => {
                return <div className={classnames("tab-wrapper", {selected: dashboard.id === props.currentSelection.id})}>
                    <div className="tab" dash-type={dashboard.id} onClick={handleClick}> { dashboard.name } </div>
                </div>
            })
        }
    </div>
  )
};

export default DashboardSelector;