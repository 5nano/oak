
interface DashboardComponent extends React.ComponentClass<{onEmptyRender: Function, data:any, graphPosition?: 'left' | 'right'}> {
    fetchData: Function 
};
export type DashboardType = {
    id: string,
    name: string,
    component: DashboardComponent,
}