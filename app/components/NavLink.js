import React from 'react';
import { Link } from 'react-router';

const NavLink = ({ props, children }) => (
    <Link {...props} activeClassName="activeLink">
        {children}
    </Link>
);

export default NavLink;
