import React from 'react';
import {Link} from 'react-router-dom';


const NotFoundPage = () => (
    <div>
        What you are looking for bro 404!
        {/* <a href='/'>Go Home</a> // Don't use that */}
        <Link to="/">Go Home</Link>
    </div>
);

export default NotFoundPage;