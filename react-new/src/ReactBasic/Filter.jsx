import React, { Component } from 'react';
import axios from 'axios'

class FilterCode extends Component {
    render() {
        return (
            <div>
                <input placeholder="Nhập Mã" type="text" id="code" className="changeFillter"/>
            </div>
        );
    }
}
class FilterSeller extends Component {
    constructor(props){
        super(props);
        this.state = {
            listFilter : []
        }
    }
    componentWillMount(){
        axios({
            method:'get',
            url:'https://master-wfs.agilsun.com/wfs/co/filter',
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        .then((res)=>{
            var list = res.data.data.seller
            this.setState({listFilter:list})
        })
        .catch((error)=> {
            console.log(error);
            });
    }
    render() {
        return (
            <div>
                <select className="changeFillter" id="FilterSeller">
                    {this.state.listFilter.map(list=>
                    <option key={list.id} id={list.id}>{list.name}</option>    
                        )}
                </select>
            </div>
        );
    }
}
class FilterMove extends Component {
    render() {
        return (
            <div>
                <select id="type" className="changeFillter">
                    <option value=" ">Tất cả</option>
                    <option value="move_sale">Chuyển bán</option>
                    <option value="move_regional">Chuyển liên khu vực</option>
                </select>
            </div>
        );
    }
}

class FilterState extends Component {
    render() {
        return (
            <div>
                <select id="state" className="changeFillter">
                    <option value=" ">Tất cả</option>
                    <option value="draft">Chờ luân chuyển</option>
                    <option value="tr_picking">Lấy hàng</option>
                    <option value="tr_picked">Đang luân chuyển</option>
                    <option value="done">Xong</option>
                    <option value="cancel">Hủy</option>
                </select>
            </div>
        );
    }
}
export  {FilterCode,FilterSeller,FilterMove,FilterState};