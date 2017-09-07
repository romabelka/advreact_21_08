import React, { Component } from 'react'
import {List} from 'react-virtualized'
import {connect} from 'react-redux'
import {peopleListSelector, fetchAllPeople} from '../../ducks/people'
import PersonCard from './PersonCard'

class PeopleList extends Component {
    static propTypes = {

    };

    componentDidMount() {
        this.props.fetchAllPeople()
    }

    render() {
        return (
            <List
                rowCount={this.props.people.length}
                rowHeight={100}
                height={300}
                width={200}
                rowRenderer={this.rowRenderer}
            />
        )
    }

    rowRenderer = ({ index, key, style }) => <PersonCard person = {this.props.people[index]} key = {key} style = {style}/>
}

export default connect(state => ({
    people: peopleListSelector(state)
}), {fetchAllPeople})(PeopleList)