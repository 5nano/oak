import * as React from 'react';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import CropsSearch from '../Crops/CropsSearch';
import CompanySearch from '../Companies/CompanySearch';
import AgrochemicalsSearch from '../Agrochemicals/AgrochemicalsSearch';
import Register from '../Users/Register';
import LogIn from '../Users/LogIn';

export interface AppProps { title: string }

const App = (props: AppProps) => (
    
    <Router>

        <Switch>
            <Route path="/" exact component={LogIn}/>
            <Route path="/register" exact component={Register}/>

            <Route path='/crops' exact component={CropsSearch}/>

            <Route path='/agrochemicals' exact component={AgrochemicalsSearch}/>
        
            <Route path='/companies' exact component={CompanySearch}/>

        </Switch>

    </Router>
)

export default App;