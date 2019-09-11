import * as React from 'react';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import CropsForm from '../Crops/CropsForm';
import { Search } from '../Search/Search';

export interface AppProps { title: string }


function Index(){
    return <h1>Home</h1>
}

const App = (props: AppProps) => (
    
    <Router>

        <Switch>
            <Route path="/" component={Search}/>}
            
        </Switch>

    </Router>
)

//return <div className="app"> Hola soy App, {props.title} </div>




export default App;