import React, { Component } from 'react';
import render from 'react-dom';

import Ionicon from 'react-ionicons';

export class Plant extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.flowers = {
            homeKeep:
                'http://planterra.com/wp-content/uploads/2015/06/WARNECKII-236x300.png',
            cactus: 'http://pngimg.com/uploads/cactus/cactus_PNG3815.png',
            birch:
                'http://planterra.com/wp-content/uploads/2015/06/Picture5-300x300.png'
        };
    }
    render() {
        return (
            <div className="landing__plants__single landing__card">
                <span className="specy">{this.props.specy}</span>
                <img
                    src={this.flowers[this.props.pic]}
                    className="landing__plants__img"
                    alt=""
                />
                <span className="landing__plants__icon--temp">
                    <span className="temp-value">
                        {this.props.stats.temperature}°
                    </span>
                    <Ionicon
                        className="landing__plants__icon"
                        icon="ios-thermometer-outline"
                    />
                </span>
                <span className="landing__plants__icon--humid">
                    <Ionicon
                        className="landing__plants__icon"
                        icon="ios-water-outline"
                        beat={this.props.stats.moisture > 380}
                    />
                </span>
                <span className="landing__plants__icon--light">
                    <Ionicon
                        className="landing__plants__icon"
                        icon="ios-sunny-outline"
                    />
                </span>
                <span className="age">
                    <Ionicon
                        icon="ios-clock-outline"
                        className="age_ico"
                    />{' '}
                    {this.props.age} old.
                </span>
                <span className="health">
                    <Ionicon icon="ios-medkit-outline" className="health_ico" />
                    good.
                </span>
            </div>
        );
    }
}

export default Plant;
