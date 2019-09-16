import * as React from 'react';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import CropsSearch from '../Crops/CropsSearch';
import CropsForm from '../Crops/CropsForm';
import Register from '../Users/Register';
import LogIn from '../Users/LogIn';

export interface AppProps { title: string }

const App = (props: AppProps) => (
    
    <Router>

        <Switch>
            <Route path="/" exact component={LogIn}/>
            <Route path="/register" exact component={Register}/>
            <Route path='/crops' exact component={CropsSearch}/>
            <Route path="/crop-new" exact component={CropsForm} />
        </Switch>

    </Router>
)

export default App;