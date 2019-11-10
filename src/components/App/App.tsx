import * as React from 'react';
import {BrowserRouter as Router,Route, Switch, Redirect} from 'react-router-dom';
import Crops from '../CRUD/Components/Crops/Crops';
import Companies from '../Companies/Companies';
import Agrochemicals from '../CRUD/Components/Agrochemicals/Agrochemicals';
import Signup from '../SignUp/Signup';
import Users from '../Users/Users';
import Assay from '../Assay/Assay';
import Dashboards from '../Dashboards/Dashboards';
import Homes from '../Home/Home';
import Mixs from '../CRUD/Components/Mixs/Mixs';
import Qrs from '../Qrs/Qrs';
import Landing from '../Landing/Landing';
import PrivateRoute from '../Utilities/ProtectedRoute/PrivateRoute';
import Treatments from '../Treatments/Treatments';
import PhotosGallery from '../PhotosGallery/PhotosGallery';
import BushService from '../../services/bush';
import { UserHeader } from '../../Interfaces/User';

export interface AppProps { title: string }

const App = (props: AppProps) => {
    const [{logged: loggedIn}, setLogin] = React.useState({logged: false});
    const [user,setUser] = React.useState<UserHeader>(null)
    const validateLogin = () => {
        if (document.cookie.includes('user') && !loggedIn)
            {
                setLogin({logged: true});
                BushService.get('/usuario')
                            .then((data:UserHeader)=>{
                                setUser(data)
                            })
            }
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

            <PrivateRoute path='/home' exact component={Homes} isLoggedIn={loggedIn} user={user}/>
        
            <PrivateRoute path='/crops' exact component={Crops} isLoggedIn={loggedIn} user={user}/>

            <PrivateRoute path='/agrochemicals' exact component={Agrochemicals} isLoggedIn={loggedIn} user={user}/>

            <PrivateRoute path='/mixs' exact component={Mixs} isLoggedIn={loggedIn} user={user}/>

            <PrivateRoute path='/companies' exact component={Companies} isLoggedIn={loggedIn} user={user}/>

            <PrivateRoute path='/users' exact component={Users} isLoggedIn={loggedIn} user={user}/>

            <PrivateRoute path='/assay' exact component={Assay} isLoggedIn={loggedIn} user={user}/>

            <PrivateRoute path='/assay/:assayId/dashboard' exact component={Dashboards} isLoggedIn={loggedIn} user={user}/>

            <PrivateRoute path='/assay/:assayId/qrs' exact component={Qrs} isLoggedIn={loggedIn} user={user}/>
          
            <PrivateRoute path='/assay/:assayId/treatments' exact component={Treatments} isLoggedIn={loggedIn} user={user}/>

            <PrivateRoute path='/photos' exact component={PhotosGallery} isLoggedIn={loggedIn} user={user}/>

          </Switch>

    </Router>
)}

export default App;
