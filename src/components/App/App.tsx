import * as React from 'react';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import CropsSearch from '../Crops/CropsSearch';

export interface AppProps { title: string }

const App = (props: AppProps) => (
    
    <Router>

        <Switch>
            <Route path="/" component={CropsSearch}/>}
            
        </Switch>

    </Router>
)

//return <div className="app"> Hola soy App, {props.title} </div>




export default App;