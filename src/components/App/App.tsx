import * as React from 'react';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
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
import * as nachoScript from '../../../nachoScript';

class ChartNachoHolder extends React.Component {
    componentDidMount() {
        const s = document.createElement('script');
        s.setAttribute("id", 'nacho-script');
        s.type = 'text/javascript';
        s.async = true;
        s.innerHTML = `(${nachoScript})()`;
        document.body.appendChild(s);
    }
    
    componentWillUnmount() {
        document.getElementById('nacho-script').remove();
    }

    render() { return (
        <>
            <div id="chartContainer" style={{height: 370, width: '100%'}} />
            <div id='someDiv' />
        </>
    )}
};

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
        <Header titles={['nachochart','register']} />
        <Switch>
            <Route 
                path="/" 
                exact 
                render={(props) => loggedIn ? <Homes {...props} /> : <LogIn {...props} validateLogin={validateLogin} />}
            />
            <Route path="/register" exact component={Register}/>

            <Route path='/crops' exact component={Crops}/>

            <Route path='/agrochemicals' exact component={Agrochemicals}/>

            <Route path='/companies' exact component={Companies}/>

            <Route path='/users' exact component={Users}/>

            <Route path='/assay' exact component={Assay}/>

            <Route path='/assay/:assayId/dashboard' exact component={Dashboards}/>

            <Route path='/nachochart' exact component={ChartNachoHolder} />
          </Switch>

    </Router>
)}

export default App;
