import React from 'react';

class Clothes extends React.Component {
    render() {
        return (
            <div className="clothes-container">
                <div className="name-category">{this.props.name}</div>
                <div className="list-container">
                    <div className="test">
                        {this.props.clothes
                            .slice(0, this.props.visible)
                            .map((jacket) => (
                                <div key={jacket.id} className="test-li">
                                    <div
                                        key={jacket.name}
                                        className="name-item"
                                    >
                                        {jacket.name}
                                    </div>
                                    <div
                                        key={jacket.colors}
                                        className="colors-item"
                                    >
                                        Colors:{' '}
                                        {jacket.color.map((color) => (
                                            <div
                                                key={color}
                                                className={`color-item ${color}`}
                                            />
                                        ))}
                                    </div>
                                    <div
                                        key={jacket.price}
                                        className="price-item"
                                    >
                                        Price: {jacket.price}€
                                    </div>
                                    <div
                                        key={jacket.availability}
                                        className={` availability ${jacket.availability}`}
                                    >
                                        {jacket.availability}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Clothes;
