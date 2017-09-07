import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Column, Table} from 'react-virtualized'
import 'react-virtualized/styles.css'
import {fetchPeopleRequest} from '../../ducks/people'

class PersonShow extends Component {
    componentDidMount() {

        this.props.fetchPeopleRequest()
    }

    render() {
        const {people} = this.props

        return (
            <div>
                <Table
                    width={600}
                    height={300}
                    headerHeight={20}
                    rowHeight={30}
                    rowCount={people.length}
                    rowGetter={({index}) => people[index]}
                >
                    <Column
                        label='First Name'
                        dataKey='firstName'
                        width={200}
                    />
                    <Column
                        width={200}
                        label='Last Name'
                        dataKey='lastName'
                    />
                    <Column
                        width={200}
                        label='E-mail'
                        dataKey='email'
                    />
                </Table>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    people: state.people
})

export default connect(mapStateToProps, {fetchPeopleRequest})(PersonShow)