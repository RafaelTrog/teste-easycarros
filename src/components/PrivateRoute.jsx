import React from 'react'
import { Route, Redirect } from 'react-router'
import { isAuthenticated } from './Auth'

const PrivateRoute = props => isAuthenticated()
    ? <Route { ...props } />
    : <Redirect to="/login" />

export default PrivateRoute