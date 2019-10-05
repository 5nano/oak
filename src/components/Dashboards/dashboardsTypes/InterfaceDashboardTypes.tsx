
export type DashboardType = {
    id: string,
    name: string,
    component: React.ComponentClass<{onEmptyRender: Function}>
}