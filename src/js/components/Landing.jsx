import React, { Component } from 'react';
import { render } from 'react-dom';
const axios = require('axios');

import Plant from './Plant';

export default class Landing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            plants: [{ name: 'a' }, { name: 'a' }, { name: 'a' }, { name: 'a' }]
        };
    }

    componentWillMount() {
        axios
            .get('https://randomuser.me/api/', {
                params: {
                    gender: 'female',
                    nat: 'gb'
                }
            })
            .then(res => {
                const [user] = res.data.results;
                this.setState({
                    user
                });
            });
    }

    getAvatar(data) {}

    render() {
        return (
            <div className="landing">
                <span className="landing__title"> planty 🌱</span>
                <div className="landing__stats landing__card">
                    {!!Object.keys(this.state.user).length && (
                        <div>
                            <img
                                className="landing__avatar"
                                src={this.state.user.picture.large}
                                alt="user avatar"
                            />
                            <div>
                                <span className="landing__name">{`${this.state
                                    .user.name.first} ${this.state.user.name
                                    .last}`}</span>
                                <hr className="light__border" />
                            </div>
                        </div>
                    )}
                </div>
                <div className="landing__plants">
                    {this.state.plants.map((plant, index) => {
                        return <Plant key={index} />;
                    })}
                </div>
            </div>
        );
    }
}
