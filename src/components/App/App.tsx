import * as React from 'react';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import CropsSearch from '../Crops/CropsSearch';
import CropsForm from '../Crops/CropsForm';
import Login from '../Users/Login';

export interface AppProps { title: string }

const App = (props: AppProps) => (
    
    <Router>

        <Switch>
            <Route path="/" component={Login}/>}
            
        </Switch>

    </Router>
)

export default App;