import React from 'react';
import './error.scss';

class ErrorPage extends React.Component {
    render() {
        return (
            <div className="main-container">
                <div className="content">
                    <section className="error">
                        <div className="title-404">
                            {this.props.errorString}
                        </div>
                        <div className="sub-title-404">
                            OOPS! Looks like we have an issue...
                        </div>
                        <div className="text-404">
                            {this.props.error}
                            <span role="img" aria-label="emoji-sad">
                                &#128532;
                            </span>
                        </div>
                        {this.props.errorString === '404' && (
                            <button
                                onClick={(event) =>
                                    (window.location.href = '/')
                                }
                                className="btn"
                            >
                                BACK TO HOME
                            </button>
                        )}
                        {this.props.errorString !== '404' && (
                            <button
                                onClick={() => window.location.reload(false)}
                                className="btn"
                            >
                                TRY AGAIN
                            </button>
                        )}
                    </section>
                </div>
            </div>
        );
    }
}

export default ErrorPage;
