import React from "react";
import { Route, Redirect } from "react-router-dom";

function RouteWrapper({
    component: Component,
    layout: Layout,
    ...rest
}) {
    return (
        <Route {...rest} render={(props) => {
            return (
                <Layout {...props}>
                    <Component {...props} />
                </Layout>
            )
        }} />
    );
}

export default RouteWrapper;