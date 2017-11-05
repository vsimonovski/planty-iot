import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link, Switch, Route } from 'react-router-dom';
const axios = require('axios');
import Ionicon from 'react-ionicons';

import Plants from './Plants';
import GMap from './GMap';

export default class Landing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            plants: []
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
                                    .user.name.first}`}</span>
                            </div>
                        </div>
                    )}
                    <div className="menu menu__active">
                        <Ionicon
                            icon="ios-pulse-outline"
                            fontSize="35px"
                            className="icon__active"
                        />
                    </div>
                    <div className="menu">
                        <Link to="/map">
                            <Ionicon icon="ios-pin-outline" fontSize="35px" />
                        </Link>
                    </div>
                    <div className="menu">
                        <Ionicon icon="ios-trophy-outline" fontSize="35px" />
                    </div>
                </div>
                <div className="main__view">
                    <Switch>
                        <Route exact path="/" component={Plants} />
                        <Route path="/map" component={GMap} />
                    </Switch>
                </div>
            </div>
        );
    }
}
