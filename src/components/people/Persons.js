import React,{Component} from 'react'
import {Table, Column} from 'react-virtualized'

export default class Persons extends Component {
    render(){
        const {
            entities=[]
        }=this.props
        console.log("Persons",entities)
        return <div>
            <Table
                        rowCount={entities.length}
                        rowHeight={40}
                        headerHeight={50}
                        overscanRowCount={5}
                        width={700}
                        height={300}
                        rowGetter={({ index }) => entities[index]}
                    >
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