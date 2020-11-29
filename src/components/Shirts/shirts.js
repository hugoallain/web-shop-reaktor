import React from 'react';
import axios from 'axios';
import '../Common/common.scss';
import Loader from '../Common/loader';
import ErrorPage from '../Error/error';
import Clothes from '../Common/clothes';
import Common from '../../functions/common';

class Shirts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Shirts',
            error: null,
            errorString: 'ERROR',
            isLoaded: false,
            shirts: [],
            visible: 17,
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

    fetchAvailabilityShirts() {
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

                    let manuShirt = null;
                    let availibityItem = null;
                    for (let i = 0; i < this.state.shirts.length; i++) {
                        let idShirt = this.state.shirts[i].id;
                        manuShirt = this.state.shirts[i].manufacturer;
                        if (this.state.mapManuItems.get(manuShirt).length > 2) {
                            Common.getAvailabilityItem(
                                availibityItem,
                                manuShirt,
                                idShirt,
                                this.state.mapManuItems,
                                this.state.shirts
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
                        'shirts',
                        JSON.stringify(this.state.shirts)
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

    receivedShirtsCollection() {
        axios
            .get('https://bad-api-assignment.reaktor.com/products/shirts')
            .then(
                (resultShirts) => {
                    this.setState({
                        shirts: resultShirts.data
                    });

                    const arrayManu = [];
                    Common.getManufactuer(arrayManu, this.state.shirts);

                    this.setState({
                        manufacturers: arrayManu
                    });
                    console.log('MANUFACTURERS: ' + arrayManu);

                    this.fetchAvailabilityShirts();
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
            !sessionStorage.getItem('shirts') &&
            !sessionStorage.getItem('error')
        ) {
            this.receivedShirtsCollection();
        } else if (sessionStorage.getItem('error')) {
            sessionStorage.removeItem('shirts');
            sessionStorage.removeItem('error');
            this.receivedShirtsCollection();
        } else {
            this.setState({
                shirts: JSON.parse(sessionStorage.getItem('shirts')),
                isLoaded: true
            });
        }
    }

    render() {
        const { error, isLoaded, visible, shirts } = this.state;
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
                        clothes={this.state.shirts}
                        visible={this.state.visible}
                        name={this.state.name}
                    />
                    {visible < shirts.length && (
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

export default Shirts;
