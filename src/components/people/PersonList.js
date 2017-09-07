import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Table, Column } from 'react-virtualized'
import {moduleName, fetchAll, personListSelector} from '../../ducks/people'
import Loader from '../common/Loader'

export class PersonList extends Component {
    componentDidMount() {
        this.props.fetchAll()
    }

    rowGetter = ({ index }) => this.props.people[index]

    render() {
        const { loading, people } = this.props

        if (loading) return <Loader/>
        return (
            <Table
              rowCount={people.length}
              rowGetter={this.rowGetter}
              rowHeight={20}
              headerHeight={30}
              width={600}
              height={300}
              rowClassName="test--people-list__row"
            >
                <Column
                  label="First Name"
                  dataKey="firstName"
                  width={200}
                />
                <Column
                  label="Last Name"
                  dataKey="lastName"
                  width={200}
                />
                <Column
                  label="Email"
                  dataKey="email"
                  width={200}
                />
            </Table>
        )
    }
}

export default connect(state => ({
    people: personListSelector(state),
    loading: state[moduleName].loading
}), {fetchAll})(PersonList)