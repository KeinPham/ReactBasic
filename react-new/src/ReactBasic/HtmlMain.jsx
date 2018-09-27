import React, { Component } from 'react';
import {Route} from "react-router-dom";
import LoginHtml from './LoginHtml';
import GetApi from './GetApi';
class HtmlMain extends Component {
    render() {
        return (
            <div>
                <Route exact path='/' component={LoginHtml} />
                <Route path='/LoginSuccess' component={ GetApi }/>
            </div>
        );
    }
}

export default HtmlMain;