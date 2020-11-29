import React from 'react';
import './error.scss';
import ErrorPage from './error';

class NotFoundPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorString: '404',
            error:
                'This page does not exist! (or you are not cool enough to see the content...)'
        };
    }

    render() {
        return (
            <ErrorPage
                error={this.state.error}
                errorString={this.state.errorString}
            />
        );
    }
}

export default NotFoundPage;
