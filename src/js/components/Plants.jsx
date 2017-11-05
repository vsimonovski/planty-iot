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
        const ngrokUpdateUrl =
            'https://674a789d.ngrok.io/temp/59fe70c3f36d2831457fb42b';
        const ngrokAllUrl =
            'https://674a789d.ngrok.io/api/users/59fe70c3f36d2831457fb42b/plants';

        axios.get(ngrokAllUrl).then(res => {
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
                    return (
                        <Plant
                            key={index}
                            name={plant.name}
                            specy={plant.specy}
                            stats={plant.stats}
                            pic={index === 0 ? 'birch' : 'cactus'}
                            age={plant.age}
                        />
                    );
                })}
            </div>
        );
    }
}

export default Plants;
