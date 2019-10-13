import * as React from 'react';
import {BrowserRouter as Router,Route, Switch, Redirect} from 'react-router-dom';
import Crops from '../Crops/Crops';
import Companies from '../Companies/Companies';
import Agrochemicals from '../Agrochemicals/Agrochemicals';
import LogIn from '../Login/LogIn';
import Header from './components/Header';
import Register from '../Users/Register';
import Users from '../Users/Users';
import Assay from '../Assay/Assay';
import Dashboards from '../Dashboards/Dashboards';
import Homes from '../Home/Home';
import Mixs from '../Mixs/Mixs';
import Qrs from '../Qrs/Qrs';
import Landing from '../Landing/Landing';


export interface AppProps { title: string }

const App = (props: AppProps) => {
    const [{logged: loggedIn}, setLogin] = React.useState({logged: false});
    const validateLogin = () => {
        if (document.cookie.includes('ssid') && !loggedIn)
            setLogin({logged: true});
    };
    validateLogin();

    return (

    <Router>

       

        {/*<Header titles={[]} loggedIn={loggedIn}/>*/}
        <Switch>
            {
                !loggedIn &&
                <Redirect from="/:foo+" to="/"></Redirect>
            }
            <Route 
                path="/" 
                exact 
                render={(props) => loggedIn ? <Homes {...props} /> : <LogIn {...props} validateLogin={validateLogin} />}
            />

            <Route path="/landing"
                   exact
                   render={(props) =>  <Landing {...props} validateLogin={validateLogin}/>}
            />

            <Route path="/register" exact component={Register}/>

            <Route path='/crops' exact component={Crops}/>

            <Route path='/agrochemicals' exact component={Agrochemicals}/>

            <Route path='/mixs' exact component={Mixs}/>

            <Route path='/companies' exact component={Companies}/>

            <Route path='/users' exact component={Users}/>

            <Route path='/assay' exact component={Assay}/>

            <Route path='/assay/:assayId/dashboard' exact component={Dashboards}/>

            <Route path='/assay/:assayId/qrs' exact component={Qrs}/>
          </Switch>

    </Router>
)}

export default App;
