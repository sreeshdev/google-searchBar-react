import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../components/home'
import { Router } from 'react-router-dom';

const AppRouter = ({ history }) => {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" history={history} component={Home} />
            </Switch>
        </Router>
    )
}

export default AppRouter