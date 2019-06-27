//Higher Order Component (HOC) -  A component(HOC) that renders another component(five or six maybe by single HOC
//Goal - Reuse Code
//Render Hijacking -- by passing value true of false we can change the rendered output
//props manipulation
//Abstract State

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => {
    return (
        <div>
            <h1>info</h1>
            <p>The info is: {props.info}</p>
        </div>
    );
};

const withAdminWarning = (WrappedComponent) => {
    return (props) => {
        return (
            <div>
                {props.isAdmin && <p>This is a private info. Please don't share!!</p>}
                <WrappedComponent {...props} />
            </div>
        );
    };
};

const requireAuthentication = (WrappedComponent) => {
    return (props) => {
        return (
            <div>
                {!props.isAuthenticated && <p>Please Login First </p>}
                {props.isAuthenticated && <WrappedComponent {...props} />}
            </div>
        );
    };
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);


// ReactDOM.render(<AdminInfo isAdmin={true} info="There are the details"/>, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={false} info="There are the details"/>, document.getElementById('app'));







