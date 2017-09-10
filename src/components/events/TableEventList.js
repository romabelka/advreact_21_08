import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, InfiniteLoader} from 'react-virtualized'
import {moduleName, fetchLazy, selectEvent, eventListSelector} from '../../ducks/events'
import Loader from '../common/Loader'
import TableEventCard from './TableEventCard'

export class EventList extends Component {
    static propTypes = {};

    componentDidMount() {
        this.props.fetchLazy()
    }

    isRowLoaded = ({index}) => index < this.props.events.length
    loadMoreRows = () => {
        console.log('---', 'load more')
        this.props.fetchLazy()
    }

    render() {
        const {loaded, events} = this.props
        if (this.props.loading) return <Loader/>
        return (
            <InfiniteLoader
                isRowLoaded={this.isRowLoaded}
                rowCount={loaded ? events.length : events.length + 1}
                loadMoreRows={this.loadMoreRows}
            >
                {({onRowsRendered, registerChild}) =>
                    <List
                        rowCount={5}
                        rowHeight={100}
                        height={300}
                        width={600}
                        rowRenderer={this.getRows}
                    />
                }
            </InfiniteLoader>
        )
    }

    getRows = (event) => {
        return this.props.events.map(event => <TableEventCard event={event}/>)
    }

    handleRowClick = (uid) => () => {
        const {selectEvent} = this.props
        selectEvent && selectEvent(uid)
    }
}
export default connect(state => ({
    events: eventListSelector(state),
    loading: state[moduleName].loading
}), {fetchLazy, selectEvent})(EventList)