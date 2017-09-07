import React, {Component} from 'react'
import {connect} from 'react-redux'
import {moduleName, selectEvent, fetchAll} from '../../ducks/people'
import {Table, Column, InfiniteLoader} from 'react-virtualized'
import 'react-virtualized/styles.css'
import Loader from '../common/Loader'
export class PeopleList extends Component {
    static propTypes = {};

    componentWillMount() {
        this.props.fetchAll()
    }

    render() {
        const {loaded, state, people, loading} = this.props
        console.log(people.toArray(), 'state.getHostNode');
        console.log(loading, 'loading');

        return (
            <div>
                {loading ? <Loader/>:
                    <Table
                        rowCount={people.toArray().length}
                        rowGetter={this.rowGetter}
                        rowHeight={50}
                        headerHeight={100}
                        width={500}
                        height={500}
                        rowClassName="people_table"
                    >
                        <Column
                            label="First Name"
                            dataKey="firstName"
                            width={300}
                        />
                        <Column
                            label="Last Name"
                            dataKey="lastName"
                            width={250}
                        />
                        <Column
                            label="Email"
                            dataKey="email"
                            width={150}
                        />
                    </Table>
                }
            </div>)
}

rowGetter = ({ index }) =>{
    console.log(this.props.people.toArray()[index].email, 'this.props.people');
    return this.props.people.toArray()[index];
}

}

export default connect(state => ({
    people: state.people,
    loading: state[moduleName].loading
}),{fetchAll})(PeopleList)