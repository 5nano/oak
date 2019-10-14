import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import Header from "../../App/components/Header";

const PrivateRoute = ({component:Component,isLoggedIn,...rest}) => (
    <Route {...rest} render={(props) => (
        isLoggedIn? ([<Header titles={[]} loggedIn={isLoggedIn}/>
                    ,<Component {...props} />])
                : <Redirect to={{
                    pathname:"/",
                    state:{from:props.location}
                    }} 
                />
        )
    }
    />
)

export default PrivateRoute;