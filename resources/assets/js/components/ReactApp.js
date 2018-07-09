import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ReactApp extends Component {
    render () {
        return (
            <div className="container">
                <p>This is a react component</p>
            </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<ReactApp />, document.getElementById('root'));
}
