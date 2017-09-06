import React,{Component} from 'react'
import {Table, Column} from 'react-virtualized'
import Loader from '../common/Loader'


export default class Persons extends Component {
    render(){
        
        const {
            entities=[],
            loading=false
        }=this.props
        
        if (loading) return <Loader/>
        return <div>
            <Table
            rowClassName="person-list__row"
            rowCount={entities.length}
            rowHeight={40}
            headerHeight={50}
            overscanRowCount={5}
            width={700}
            height={300}
            rowGetter={({ index }) => entities[index]}>
                        <Column
                            label="firstName"
                            dataKey="firstName"
                            width={300}
                        />
                        <Column
                            label="lastName"
                            dataKey="lastName"
                            width={250}
                        />
                        <Column
                            label="email"
                            dataKey="email"
                            width={150}
                        />
                    </Table>
        </div>
    }
    
}