
interface DashboardComponent extends React.ComponentClass<{onEmptyRender: Function, data:any}> {
    fetchData: Function 
};
export type DashboardType = {
    id: string,
    name: string,
    component: DashboardComponent,
}