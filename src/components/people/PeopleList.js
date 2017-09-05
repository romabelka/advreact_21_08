import React, {Component} from 'react'
import {connect} from 'react-redux'
import {moduleName, peopleListSelector, fetchPeople} from '../../ducks/people'
import {List} from 'react-virtualized'
import 'react-virtualized/styles.css'

class PeopleList extends Component {

    componentDidMount(){
        this.props.fetchPeople()
    }

    render() {

        const {people} = this.props

        return <List
            width={300}
            height={500}
            rowCount={people.length}
            rowHeight={20}
            rowRenderer={this.rowRenderer}
        />
    }

    rowRenderer ({key, index, isScrolling, isVisible, style}) {
        return (
            <div
                key={key}
                style={style}
            >
                {this.props.people[index]}
            </div>
        )
    }
}

export default connect(state => ({
    people: peopleListSelector(state)
}), {fetchPeople})(PeopleList)