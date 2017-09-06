import React from 'react'
import {shallow} from "enzyme"
import Persons from "./Persons"
import NewPersonForm from "./NewPersonForm"
import Loader from '../common/Loader'

const entities=[{
        id: 1,
        firstName: 1,
        lastName: 1,
        email: 1
    },
    {
        id: 2,
        firstName: 2,
        lastName: 2,
        email: 2
    },
    {
        id: 3,
        firstName: 3,
        lastName: 3,
        email: 3
    }
]


it('show loader',()=>{
    //какие бы компоненты сюда не подставлял всегда проходит
    //const container=shallow(<Persons/>)/NewPersonForm
    //expect(container.contains(<Loader/>))/NewPersonForm
    //пока я не написал вот так
    const container=shallow(<Persons loading={true}/>)

    
    expect(container.contains(<Loader/>)).toEqual(true)
})

//не прошкел тест=(
//дедлайн поковырять не успел больше
it('should render event list', () => {
    

    const container = shallow(<Persons entities = {entities}/>)

    const rows = container.find('.person-list__row')

    expect(rows.length).toEqual(entities.length)
})

