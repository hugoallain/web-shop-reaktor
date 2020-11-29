import React from 'react';
import axios from 'axios';
import '../Common/common.scss';
import Loader from '../Common/loader';
import ErrorPage from '../Error/error';
import Clothes from '../Common/clothes';
import Common from '../../functions/common';

class Accessories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Accessories',
            error: null,
            errorString: 'ERROR',
            isLoaded: false,
            accessories: [],
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

    fetchAvailabilityAccessories() {
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

                    // Use and access the results

                    let manuAccessory = null;
                    let availibityItem = null;
                    for (let i = 0; i < this.state.accessories.length; i++) {
                        let idAccessory = this.state.accessories[i].id;
                        manuAccessory = this.state.accessories[i].manufacturer;
                        if (
                            this.state.mapManuItems.get(manuAccessory).length >
                            2
                        ) {
                            Common.getAvailabilityItem(
                                availibityItem,
                                manuAccessory,
                                idAccessory,
                                this.state.mapManuItems,
                                this.state.accessories
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
                        'accessories',
                        JSON.stringify(this.state.accessories)
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

    receivedAccessoriesCollection() {
        axios
            .get('https://bad-api-assignment.reaktor.com/products/accessories')
            .then(
                (resultAccessories) => {
                    this.setState({
                        accessories: resultAccessories.data
                    });

                    const arrayManu = [];
                    Common.getManufactuer(arrayManu, this.state.accessories);

                    this.setState({
                        manufacturers: arrayManu
                    });
                    console.log('MANUFACTURERS: ' + arrayManu);

                    this.fetchAvailabilityAccessories();
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
            !sessionStorage.getItem('accessories') &&
            !sessionStorage.getItem('error')
        ) {
            this.receivedAccessoriesCollection();
        } else if (sessionStorage.getItem('error')) {
            sessionStorage.removeItem('accessories');
            sessionStorage.removeItem('error');
            this.receivedAccessoriesCollection();
        } else {
            this.setState({
                accessories: JSON.parse(sessionStorage.getItem('accessories')),
                isLoaded: true
            });
        }
    }

    render() {
        const { error, isLoaded, visible, accessories } = this.state;
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
                        clothes={this.state.accessories}
                        visible={this.state.visible}
                        name={this.state.name}
                    />
                    {visible < accessories.length && (
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

export default Accessories;
