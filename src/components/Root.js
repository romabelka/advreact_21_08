import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import AdminPage from './routes/AdminPage'
import AuthPage from './routes/AuthPage'
import ProtectedRoute from './common/ProtectedRoute'
import PeopleForm from './people/PeopleForm'

class Root extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <ProtectedRoute path="/admin" component={AdminPage}/>
                <ProtectedRoute path="/people" component={PeopleForm} />
                <Route path="/auth" component={AuthPage}/>
            </div>
        )
    }
}

export default Root