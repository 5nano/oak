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
import PrivateRoute from '../Utilities/ProtectedRoute/PrivateRoute';

export interface AppProps { title: string }

const App = (props: AppProps) => {
    const [{logged: loggedIn}, setLogin] = React.useState({logged: false});
    const validateLogin = () => {
        if (document.cookie.includes('user') && !loggedIn)
            setLogin({logged: true});
    };
    validateLogin();

    return (

    <Router>

        <Switch>

            <Route path='/' 
                   exact 
                   render={(props)=>loggedIn? <Redirect to="/home"/> : <Landing {...props} validateLogin={validateLogin} />}
            />

            <PrivateRoute path='/home' exact component={Homes} isLoggedIn={loggedIn}/>
        
            <Route path="/register" exact component={Register} isLoggedIn={loggedIn}/>

            <PrivateRoute path='/crops' exact component={Crops} isLoggedIn={loggedIn}/>

            <PrivateRoute path='/agrochemicals' exact component={Agrochemicals} isLoggedIn={loggedIn}/>

            <PrivateRoute path='/mixs' exact component={Mixs} isLoggedIn={loggedIn}/>

            <PrivateRoute path='/companies' exact component={Companies} isLoggedIn={loggedIn}/>

            <PrivateRoute path='/users' exact component={Users} isLoggedIn={loggedIn}/>

            <PrivateRoute path='/assay' exact component={Assay} isLoggedIn={loggedIn}/>

            <PrivateRoute path='/assay/:assayId/dashboard' exact component={Dashboards} isLoggedIn={loggedIn}/>

            <PrivateRoute path='/assay/:assayId/qrs' exact component={Qrs} isLoggedIn={loggedIn}/>
          </Switch>

    </Router>
)}

export default App;
