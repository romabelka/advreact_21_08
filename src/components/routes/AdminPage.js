import React, { Component } from 'react'
import PeopleList from '../people/PeopleList'
import EventTable from '../events/VirtualizedEventList'
import SelectedEvents from '../events/SelectedEvents'
import TableEventList from '../events/TableEventList'
import Basket from '../common/Basket/Basket.js'

class AdminPage extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>

                <h1>Admin Page</h1>
                <PeopleList/>
                <SelectedEvents/>
                {/*<EventTable/>*/}
                <Basket />
                <TableEventList/>
            </div>
        )
    }
}

export default AdminPage