import * as React from 'react';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import Crops from '../Crops/Crops';
import Companies from '../Companies/Companies';
import Agrochemicals from '../Agrochemicals/Agrochemicals';
import Register from '../Users/Register';
import LogIn from '../Users/LogIn';
import Header from './components/Header';

export interface AppProps { title: string }

const App = (props: AppProps) => (
    
    <Router>
        <Header titles={['home','contact','signup']}/>
        <Switch>
            <Route path="/" exact component={LogIn}/>
            <Route path="/register" exact component={Register}/>

            <Route path='/crops' exact component={Crops}/>

            <Route path='/agrochemicals' exact component={Agrochemicals}/>
        
            <Route path='/companies' exact component={Companies}/>

        </Switch>

    </Router>
)

export default App;