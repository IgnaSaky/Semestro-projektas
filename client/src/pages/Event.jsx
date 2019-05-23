import React, { Component } from 'react'
import Navbar from '../components/Homepage/Navbar.jsx';

export class Event extends Component {
    constructor(props){
        super(props);
        this.state ={
            params: []
        }
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({params: params});
    }
    render() {
        return (
            <div>
                <Navbar />
                ID:{this.state.params.id}
            </div>
        )
    }
}

export default Event
