import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../actions/auth';


export const Header = (props) => {
    return (
        <div>
            <header className='header'>
                <div className='content-container'>
                    <div className='header__content'>
                        <Link className='header__title' to='/dashboard'>
                            <h1>Expensify</h1>
                        </Link>
                        <button className='button button--link' onClick={props.startLogout}>Logout</button>
                    </div>
                </div>
            </header>
        </div>
    );
};

const mapDispatchToProp = (dispatch) => {
    return {
        startLogout: () => dispatch(startLogout())
    }
}

export default connect(undefined, mapDispatchToProp)(Header);