import React from 'react';
import { NavLink } from 'react-router-dom';
import './navigation.scss';
import './navigation-responsive.scss';

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.el = React.createRef();
    }

    onMenuClick() {
        if (window.innerWidth < 992) {
            this.el.current.classList.toggle('open');
            const menuBtn = document.querySelector('.menu-btn');
            const body = document.querySelector('body');
            const logo = document.querySelector('.logo-nav');
            if (this.el.current.classList.contains('open')) {
                menuBtn.classList.add('open');
                body.classList.add('fixed');
                logo.classList.add('hide');
            } else {
                menuBtn.classList.remove('open');
                body.classList.remove('fixed');
                logo.classList.remove('hide');
            }
        }
    }

    render() {
        return (
            <div {...this.props} ref={this.el} className="navigation">
                <div
                    role="button"
                    tabIndex={0}
                    onClick={this.onMenuClick.bind(this)}
                    onKeyDown={this.onMenuClick.bind(this)}
                    className="menu-btn"
                >
                    <div className="menu-btn-burger" />
                </div>
                <div className="logo-nav">
                    my<span className="logo-span">Shop</span>
                </div>
                <nav className="nav-links">
                    <NavLink
                        onClick={this.onMenuClick.bind(this)}
                        className="link"
                        exact={true}
                        activeClassName="link-active"
                        to="/"
                    >
                        HOME
                    </NavLink>
                    <NavLink
                        onClick={this.onMenuClick.bind(this)}
                        className="link"
                        activeClassName="link-active"
                        to="/jackets"
                    >
                        JACKETS
                    </NavLink>
                    <NavLink
                        onClick={this.onMenuClick.bind(this)}
                        className="link"
                        activeClassName="link-active"
                        to="/shirts"
                    >
                        SHIRTS
                    </NavLink>
                    <NavLink
                        onClick={this.onMenuClick.bind(this)}
                        className="link"
                        activeClassName="link-active"
                        to="/accessories"
                    >
                        ACCESSORIES
                    </NavLink>
                </nav>
            </div>
        );
    }
}

export default Navigation;
