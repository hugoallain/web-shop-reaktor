import React from 'react';
import shopping from '../../images/shopping.svg';
import './home.scss';
import './home-responsive.scss';

class Home extends React.Component {
    render() {
        return (
            <div className="main-container">
                <div className="content-container">
                    <div className="text-container">
                        <div className="title">Brand Designer</div>
                        <div className="text">
                            Hi! Welcome to our store. In our website, you can
                            take a look at all our products. We are professional
                            in designing jackets, shirts and accessories. We
                            hope that you will enjoy our collections. Don't
                            hesitate to contact us if you have some issues or
                            questions about the shop! We will be very happy to
                            assist you.
                        </div>
                        <button
                            onClick={(event) =>
                                window.open('https://hugoallain.fr', '_blank')
                            }
                        >
                            Contact us
                        </button>
                    </div>
                    <div className="picture">
                        <img src={shopping} alt="shopping" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
