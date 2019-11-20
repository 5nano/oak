
interface DashboardComponent extends React.ComponentClass<{
    onEmptyRender: Function, 
    data:any,
    treatments:any,
    dateRange: object,
     graphPosition?: 'left' | 'right'}> 
    {
        fetchData: Function 
    };

export type DashboardType = {
    id: string,
    name: string,
    component: DashboardComponent,
}