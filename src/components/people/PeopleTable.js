import React, { Component } from 'react'
import {connect} from 'react-redux'
import {peopleListSelector, fetchAllPeople} from '../../ducks/people'
import {Table, Column} from 'react-virtualized'
import {TransitionMotion, spring} from 'react-motion'

export class PeopleTable extends Component {
    static propTypes = {

    };

    componentDidMount() {
        this.props.fetchAllPeople && this.props.fetchAllPeople()
    }

    componentDidUpdate({people}) {
        if (people.length && this.props.people.length > people.length) {
            setTimeout(() => {
                this.table.scrollToRow(this.props.people.length)
            }, 0)
        }
    }

    render() {
        if (!this.props.people.length) return null
        return (
            <TransitionMotion
                willEnter={this.willEnter}
                styles={this.getStyles}
            >
                {interpolatedStyles =>
                    <Table
                        width={600}
                        height={300}
                        rowHeight={40}
                        headerHeight={50}
                        rowGetter={this.rowGetter}
                        rowCount={interpolatedStyles.length}
                        overscanRowCount={2}
                        rowClassName="test--people-list__row"
                        rowStyle={({ index }) => index < 0 ? {} : interpolatedStyles[index].style}
                        ref={this.setListRef}
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
                }
            </TransitionMotion>
        )
    }

    willEnter = () => ({
        opacity: 0
    })

    getStyles = () => this.props.people.map(person => ({
        key: person.uid,
        style: {
            opacity: spring(1)
        },
        data: person
    }))

    setListRef = ref => this.table = ref

    rowGetter = ({ index }) => this.props.people[index]
}

export default connect(state => ({
    people: peopleListSelector(state)
}), {fetchAllPeople})(PeopleTable)