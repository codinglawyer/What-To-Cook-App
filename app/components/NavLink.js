import React from 'react'
import T from 'prop-types'
import { Link } from 'react-router'

const NavLink = ({ props, children }) => (
  <Link {...props} activeClassName='activeLink'>
    {children}
  </Link>
)

NavLink.propTypes = {
  props: T.object,
  children: T.element
}

export default NavLink
