import React, { Component } from 'react';
import render from 'react-dom';

import Ionicon from 'react-ionicons';

export class Plant extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.flower =
            'http://planterra.com/wp-content/uploads/2015/06/WARNECKII-236x300.png';
    }
    render() {
        return (
            <div className="landing__plants__single landing__card">
                <img
                    src={this.flower}
                    className="landing__plants__img"
                    alt=""
                />
                <span className="landing__plants__icon--temp">
                    <span className="temp-value">24°</span>
                    <Ionicon
                        className="landing__plants__icon"
                        icon="ios-thermometer-outline"
                    />
                </span>
                <span className="landing__plants__icon--humid">
                    <Ionicon
                        className="landing__plants__icon"
                        icon="ios-water-outline"
                        beat={true}
                    />
                </span>
                <span className="landing__plants__icon--light">
                    <Ionicon
                        className="landing__plants__icon"
                        icon="ios-sunny-outline"
                    />
                </span>
            </div>
        );
    }
}

export default Plant;
