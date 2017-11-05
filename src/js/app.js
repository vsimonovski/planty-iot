import React, { Component } from 'react';
import { render } from 'react-dom';
import './css_modules';

import Landing from './components/Landing';

class Home extends Component {
    render() {
        return <Landing />;
    }
}

render(<Home />, document.getElementById('app'));
