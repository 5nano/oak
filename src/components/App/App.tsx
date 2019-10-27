import * as React from 'react';
import {BrowserRouter as Router,Route, Switch, Redirect} from 'react-router-dom';
import Crops from '../Crops/Crops';
import Companies from '../Companies/Companies';
import Agrochemicals from '../Agrochemicals/Agrochemicals';
import Signup from '../SignUp/Signup';
import Users from '../Users/Users';
import Assay from '../Assay/Assay';
import Dashboards from '../Dashboards/Dashboards';
import Homes from '../Home/Home';
import Mixs from '../Mixs/Mixs';
import Qrs from '../Qrs/Qrs';
import Landing from '../Landing/Landing';
import PrivateRoute from '../Utilities/ProtectedRoute/PrivateRoute';
import Treatments from '../Treatments/Treatments';

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

            <Route path='/register' 
                   exact 
                   render={(props)=>loggedIn? <Redirect to="/home"/> : <Signup {...props}/>}
            />

            <PrivateRoute path='/home' exact component={Homes} isLoggedIn={loggedIn}/>
        
            <PrivateRoute path='/crops' exact component={Crops} isLoggedIn={loggedIn}/>

            <PrivateRoute path='/agrochemicals' exact component={Agrochemicals} isLoggedIn={loggedIn}/>

            <PrivateRoute path='/mixs' exact component={Mixs} isLoggedIn={loggedIn}/>

            <PrivateRoute path='/companies' exact component={Companies} isLoggedIn={loggedIn}/>

            <PrivateRoute path='/users' exact component={Users} isLoggedIn={loggedIn}/>

            <PrivateRoute path='/assay' exact component={Assay} isLoggedIn={loggedIn}/>

            <PrivateRoute path='/assay/:assayId/dashboard' exact component={Dashboards} isLoggedIn={loggedIn}/>

            <PrivateRoute path='/assay/:assayId/qrs' exact component={Qrs} isLoggedIn={loggedIn}/>
          
            <PrivateRoute path='/assay/:assayId/treatments' exact component={Treatments} isLoggedIn={loggedIn}/>

          </Switch>

    </Router>
)}

export default App;
