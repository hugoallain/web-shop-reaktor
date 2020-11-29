import React from 'react';
import './loader.css';

class Loader extends React.Component {
    render() {
        return (
            <div className="loader">
                <div className="loading" />
                <div className="title-loading">Loading</div>
            </div>
        );
    }
}

export default Loader;
