import React from 'react';
import axios from 'axios';
import '../Common/common.scss';
import '../Common/common-responsive.scss';
import Loader from '../Common/loader';
import ErrorPage from '../Error/error';
import Clothes from '../Common/clothes';
import Common from '../../functions/common';

class JacketsTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Jackets',
            error: null,
            errorString: 'ERROR',
            isLoaded: false,
            visible: 17,
            jackets: [],
            manufacturers: [],
            mapManuItems: new Map()
        };
        this.loadMore = this.loadMore.bind(this);
    }

    loadMore() {
        this.setState((prev) => {
            return { visible: prev.visible + 16 };
        });
    }

    fetchAvailabilityJackets() {
        const arrayManu = this.state.manufacturers;
        const arrayRequests = [];
        Common.generateRequestsManufacturers(arrayManu, arrayRequests);

        axios
            .all(arrayRequests)
            .then(
                axios.spread((...responses) => {
                    for (let i = 0; i < arrayRequests.length; i++) {
                        console.log(responses[i].data.response);
                        this.setState({
                            mapManuItems: this.state.mapManuItems.set(
                                arrayManu[i],
                                responses[i].data.response
                            )
                        });
                        console.log(this.state.mapManuItems);
                    }

                    // use/access the results

                    let manuJacket = null;
                    let availibityItem = null;
                    for (let i = 0; i < this.state.jackets.length; i++) {
                        let idJacket = this.state.jackets[i].id;
                        manuJacket = this.state.jackets[i].manufacturer;
                        if (
                            this.state.mapManuItems.get(manuJacket).length > 2
                        ) {
                            Common.getAvailabilityItem(
                                availibityItem,
                                manuJacket,
                                idJacket,
                                this.state.mapManuItems,
                                this.state.jackets
                            );
                        } else {
                            sessionStorage.setItem('error', 'error');
                            this.setState({
                                isLoaded: true,
                                error:
                                    'We have some issues to load the items of one of our manufacturer. '
                            });
                        }
                    }

                    sessionStorage.setItem(
                        'jackets',
                        JSON.stringify(this.state.jackets)
                    );
                    this.setState({
                        isLoaded: true
                    });
                })
            )
            .catch((errors) => {
                this.setState({
                    isLoaded: true,
                    error: errors.message
                });
            });
    }

    receivedJacketsCollection() {
        axios
            .get('https://bad-api-assignment.reaktor.com/products/jackets')
            .then(
                (resultJackets) => {
                    this.setState({
                        jackets: resultJackets.data
                    });

                    const arrayManu = [];
                    Common.getManufactuer(arrayManu, this.state.jackets);

                    this.setState({
                        manufacturers: arrayManu
                    });
                    console.log('MANUFACTURERS: ' + arrayManu);

                    this.fetchAvailabilityJackets();
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error.message
                    });
                }
            );
    }

    componentDidMount() {
        if (
            !sessionStorage.getItem('jackets') &&
            !sessionStorage.getItem('error')
        ) {
            this.receivedJacketsCollection();
        } else if (sessionStorage.getItem('error')) {
            sessionStorage.removeItem('jackets');
            sessionStorage.removeItem('error');
            this.receivedJacketsCollection();
        } else {
            this.setState({
                jackets: JSON.parse(sessionStorage.getItem('jackets')),
                isLoaded: true
            });
        }
    }

    render() {
        const { error, isLoaded, visible, jackets } = this.state;
        if (error) {
            return (
                <ErrorPage
                    error={this.state.error}
                    errorString={this.state.errorString}
                />
            );
        } else if (!isLoaded) {
            return <Loader />;
        } else {
            return (
                <div className="main-container">
                    <Clothes
                        clothes={this.state.jackets}
                        visible={this.state.visible}
                        name={this.state.name}
                    />
                    {visible < jackets.length && (
                        <button
                            onClick={this.loadMore}
                            type="button"
                            className="load-more"
                        >
                            Load more
                        </button>
                    )}
                </div>
            );
        }
    }
}

export default JacketsTest;
