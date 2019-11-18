import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import Header from "../../App/components/Header";
import Layout from "../../Layout/Layout";
import Loader from "../Loader/Loader";

const PrivateRoute = ({component:Component,isLoggedIn,user,...rest}) => (
    <Route {...rest} render={(props) => (
        isLoggedIn? 
            user===null? 
                <div className="empty-content">
                   
                </div>
            :
            <Layout {...props} user={user} renderContent={()=>(
                   
                        <Component {...props} />
                   
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