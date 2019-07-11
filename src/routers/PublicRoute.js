import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({isAuthenticated, component: Component, ...rest}) => {
    return (
        <Route {...rest} component={() => (
            isAuthenticated ? (
                <Redirect to='/dashboard' />
            ) : (
                <Component />
            )
        )}/>
    );
}

const mapStateToProp = (state) => {
    return {
        isAuthenticated: !!state.auth.uid
    }
}

export default connect(mapStateToProp)(PublicRoute);