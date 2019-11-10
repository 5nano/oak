import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import Header from "../../App/components/Header";
import Layout from "../../Layout/Layout";

const PrivateRoute = ({component:Component,isLoggedIn,user,...rest}) => (
    <Route {...rest} render={(props) => (
        isLoggedIn? 
        <Layout {...props} user={user} renderContent={()=>(
                <div className="content">
                    <Component {...props} />
                </div>
        )}/>
        : 
        <Redirect to={{
            pathname:"/",
            state:{from:props.location}
            }} 
        />
        )
    }
    />
)

export default PrivateRoute;