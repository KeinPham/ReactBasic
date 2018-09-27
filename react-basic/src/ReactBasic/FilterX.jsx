import React, { Component } from 'react';
import $ from 'jquery'
class FilterX extends Component {
    constructor(props){
        super(props);
        this.state = {
            btnFilter : false
        }
    }
    btnFilter = () => {
        this.setState(stateReturn => ({
            btnFilter: !stateReturn.btnFilter
          }));
    }
    render() {
        const Alo = this.state.btnFilter
        if(Alo === false){
            $('#controlFilter').hide();
        }else{
            $('#controlFilter').show();
        }
        return (
            <div>
                <button onClick={this.btnFilter} className="zxc btn-sm btn-danger">Bộ Lọc</button>
            </div>
        );
    }
}
class LogOut extends Component {
    LogOut(){
        localStorage.removeItem('token');
        window.location.href = 'http://localhost:3000/';
    };
    render(){
        return(
            <button type="input" onClick={this.LogOut}>LogOut</button>
        )
    }
}

export {FilterX,LogOut};