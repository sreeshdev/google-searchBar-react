import React from 'react'
import { hot } from 'react-hot-loader/root';
import { history } from '../_helpers';
import AppRouter from './router'
import ErrorBoundary from '../components/ErrorBoundary'
import './App.scss'
const App = () => (
    <ErrorBoundary>
        <AppRouter history={history} />
    </ErrorBoundary>

)

export default hot(App)