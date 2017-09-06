import React, {Component} from 'react'
import {connect} from 'react-redux'
import {moduleName, peopleListSelector, fetchPeople} from '../../ducks/people'
import {List} from 'react-virtualized'
import 'react-virtualized/styles.css'

class PeopleList extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount(){
        this.props.fetchPeople()
    }

    render() {

        const {people} = this.props
        console.log(people)

        return <div><List
            width={300}
            height={500}
            rowCount={people.length}
            rowHeight={20}
            rowRenderer={this.rowRenderer(people)}
        /></div>
    }

    rowRenderer = people => ({key, index, isScrolling, isVisible, style}) => {
        return (
            <div
                key={key}
                style={style}
                className="test--people-list__row"
            >
                {people[index].firstName }
                &nbsp;
                {people[index].lastName }
                &nbsp;
                {people[index].email }
            </div>
        )
    }
}

export default connect(state => ({
    people: peopleListSelector(state)
}), {fetchPeople})(PeopleList)