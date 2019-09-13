import * as React from 'react';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import CropsSearch from '../Crops/CropsSearch';
import CropsForm from '../Crops/CropsForm';

export interface AppProps { title: string }

const App = (props: AppProps) => (
    
    <Router>

        <Switch>
            <Route path="/" component={CropsSearch}/>}
            
        </Switch>

    </Router>
)

export default App;