import React, { Component } from 'react';
import axios from 'axios';

import Plant from './Plant';

export class Plants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plants: []
        };
    }

    componentWillMount() {
        axios
            .get(
                'http://localhost:9090/api/users/59fe70c3f36d2831457fb42b/plants'
            )
            .then(res => {
                console.log(res.data);

                this.setState({
                    plants: res.data
                });
            });
    }
    render() {
        return (
            <div className="landing__plants">
                {this.state.plants.map((plant, index) => {
                    return <Plant key={index} />;
                })}
            </div>
        );
    }
}

export default Plants;
