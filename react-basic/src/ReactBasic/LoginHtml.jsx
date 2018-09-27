import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom';
class LoginHtml extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirectToReferrer: false
        }
    }
    FunC = () =>{
        var userFormData = new FormData();
        userFormData.set('email', /*$('.idEmail').val()*/'hoangtienquan');
        userFormData.set('password', /*$('.idPassword').val()*/'quan2');

        axios({
            method: 'post',
            url: 'https://master-wfs.agilsun.com/wfs/auth/token',
            data: userFormData,
            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
        })
        .then((res) => {
            localStorage.setItem('token', res.data.token);
            this.setState({ redirectToReferrer: true })
            })
        .catch((error)=> {
        console.log(error);
        })
    }
    render() {
        const { redirectToReferrer } = this.state;
        if (redirectToReferrer === true) {
            return <Redirect to='/LoginSuccess' />;
        }
        return (
            <div>
                <div id="Login">
					<input className="idEmail" type="text" placeholder="Email"/>
					<input className="idPassword" type="password" placeholder="Password"/>
                    <button className="idLogin btn-sm btn-primary" type="button" onClick={this.FunC}>Login</button>          
                </div>
            </div>
        );
    }
}

export default LoginHtml;