import React, { Component } from 'react';
import './App.scss'
import { BrowserRouter as Router} from "react-router-dom";
import HtmlMain from './ReactBasic/HtmlMain';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
class App extends Component {
	render(){
		return(
			<Router>
				<div>
					<HtmlMain/>
				</div>
			</Router>
		)
		
	}
}

export default App;