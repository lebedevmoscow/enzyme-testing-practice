import React from 'react'
import Todo from './Todo'
import { shallow } from 'enzyme'

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new Adapter()})

describe("<Todo /> component Unit Tests", () => {
    const mockFn = jest.fn()
    const props = {
        onClick: mockFn,
        completed: false,
        text: "buy milk"
    }

    let component;

    beforeEach(() => {
        component = shallow(<Todo {...props} />)
    })

    it("should render 1 <Todo /> component", () => {
        expect(component).toHaveLength(1)
        expect(component.find("li")).toHaveLength(1)
    })

    it("should render props correctly", () => {
        expect(component.props().children).toEqual("buy milk")
    })

    it("should set props correctly", () => {
        component.setProps({text: "hello"})
        expect(component.props().children).toEqual("hello")
    })

    it("should call onClick handler when Todo component is clicked", () => {
        const component = shallow(<Todo {...props}/>)
        component.simulate("click")
        expect(mockFn).toHaveBeenCalledTimes(1)
    })

})

describe("<Todo /> styling behavior", () => {

    const mockFn = jest.fn()

    it("should not have linethrought style when Todo is incomplete", () => {
        const component = shallow(<Todo onClick={mockFn} completed={false} text={"go shopping"}/>)
        expect(component.props().style).toEqual({textDecoration: "none"})
    })

    it("should have linethrought style when Todo is complete", () => {
        const component = shallow(<Todo onClick={mockFn} completed={true} text={"go shopping"}/>)
        expect(component.props().style).toEqual({textDecoration: "line-through"})
    })
})