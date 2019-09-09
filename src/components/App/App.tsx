import * as React from 'react';

export interface AppProps { title: string }

const App = (props: AppProps) => (
    <div className="app"> Hola soy App, {props.title} </div>
)

export default App;