import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { render } from 'react-dom';
import './css_modules';

import Landing from './components/Landing';
import GMap from './components/GMap';

class Home extends Component {
    render() {
        return (
            <BrowserRouter>
                <Landing />
            </BrowserRouter>
        );
    }
}

render(<Home />, document.getElementById('app'));
