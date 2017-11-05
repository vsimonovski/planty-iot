import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link, Switch, Route } from 'react-router-dom';
const axios = require('axios');
import Ionicon from 'react-ionicons';

const classNames = require('classnames');
import Plants from './Plants';
import GMap from './GMap';
import Achiev from './Achiev';

export default class Landing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            plants: []
        };

        this.mapActive = false;
        this.accActive = false;
        this.dashActive = true;
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
        let mapClass = classNames({
            menu: true,
            menu__active: this.mapActive
        });

        let accClass = classNames({
            menu: true,
            menu__active: this.accActive
        });

        let dashClass = classNames({
            menu: true,
            menu__active: this.dashActive
        });

        return (
            <div className="landing">
                <span className="landing__title"> planty 🌱</span>
                <div className="landing__stats landing__card">
                    {!!Object.keys(this.state.user).length && (
                        <div className="avatar-wrap">
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
                    <div className={dashClass}>
                        <Link
                            to="/"
                            onClick={() => {
                                this.dashActive = true;
                                this.mapActive = false;
                                this.accActive = false;
                            }}
                        >
                            <Ionicon
                                icon="ios-pulse-outline"
                                fontSize="35px"
                                className="icon__active"
                            />
                        </Link>
                    </div>
                    <div className={mapClass}>
                        <Link
                            to="/map"
                            onClick={() => {
                                this.dashActive = false;
                                this.mapActive = true;
                                this.accActive = false;
                            }}
                        >
                            <Ionicon
                                icon="ios-pin-outline"
                                fontSize="35px"
                                className="icon__active"
                            />
                        </Link>
                    </div>
                    <div className={accClass}>
                        <Link
                            to="/achievements"
                            onClick={() => {
                                this.dashActive = false;
                                this.mapActive = false;
                                this.accActive = true;
                            }}
                        >
                            <Ionicon
                                icon="ios-trophy-outline"
                                fontSize="35px"
                                className="icon__active"
                            />
                        </Link>
                    </div>
                </div>
                <div className="main__view">
                    <Switch>
                        <Route exact path="/" component={Plants} />
                        <Route path="/map" component={GMap} />
                        <Route path="/achievements" component={Achiev} />
                    </Switch>
                </div>
            </div>
        );
    }
}
