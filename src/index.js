import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Shirts from './components/Shirts/shirts';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Accessories from './components/Accessories/accessories';
import Home from './components/Home/home';
import Navigation from './components/Navigation/navigation';
import { TypographyStyle, GoogleFont } from 'react-typography';
import typography from './utils/typography';
import JacketsTest from './components/Jackets/jacket';
import NotFoundPage from './components/Error/404';

ReactDOM.render(
    <React.StrictMode>
        <TypographyStyle typography={typography} />
        <GoogleFont typography={typography} />
        <Router>
            <Navigation />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/jackets" exact component={JacketsTest} />
                <Route path="/shirts" exact component={Shirts} />
                <Route path="/accessories" exact component={Accessories} />
                <Route path="*" component={NotFoundPage} />
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
