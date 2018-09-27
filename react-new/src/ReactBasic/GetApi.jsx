import React, { Component } from 'react';
import axios from 'axios'
import {FilterX,LogOut} from './FilterX';
import $ from 'jquery';
class GetApi extends Component {
    constructor(props){
        super(props);
        this.state = {
            main : [],
            listFilSell:[]
        };
    }
    showDate = (date)=>{
        return date
    }
    showStatus = (valueState) => {
		var result = '';
		switch(valueState) {
		    case 'tr_picked':
		        result = 'Chờ luân chuyển';
		        break;
		    case 'done':
		        result ='Xong';
		        break;
		    case 'tr_picking':
		        result = 'Lấy hàng';
		        break;
		    default:
		        result = 'error';
		        break;
		}
		return result;
    }
    ABC(plusUrl){
        if(localStorage.getItem('token')!== ""){
            axios({
                method:'get',
                url:'https://master-wfs.agilsun.com/wfs/transfer/list?limit=30&page=1&',
                params: plusUrl,
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            .then((res)=>{
                var ObjItem = res.data.data.records
                this.setState({main:ObjItem})
                this.filSeller()
            })
            .catch((error)=> {
                console.log('Chưa có token');
                });
        }
    }
    filSeller(){
        axios({
                method:'get', 
                url: "https://master-wfs.agilsun.com/wfs/co/filter",
                headers: {
                    Authorization: localStorage.getItem('token')
                }  
        })
        .then((seller)=>{
                var ObjSeller = seller.data.data.seller;
                this.setState({listFilSell:ObjSeller})
        })
    }

    componentWillMount(){
        this.ABC();
    }
    onchange=()=>{
        const param = {
            'code' : $('#code').val(),
            'seller': $('#seller').val(),
            'transfer_type': $('#type').val(),
            'state':$('#state').val(),
        };
        for(var x in param){
            if(param[x] === "" || param[x] === undefined || param[x] === null || param[x] === " "){
                delete param[x]
            }
        }
        this.ABC(param)
    }
    render(){
        return(
            <div>
            <LogOut/>
            <FilterX/>
            <button onClick={this.showDate}>Click</button>
            <table className='table'>
                <thead>
                    <tr id="titleTable">
                        <th>MÃ</th>
                        <th>SELLER</th>
                        <th>NGÀY TẠO</th>
                        <th>KHO ĐI</th>
                        <th>KHO ĐẾN</th>
                        <th>LOẠI CHUYỂN</th>
                        <th>TRẠNG THÁI</th>
                    </tr>
                    <tr id="controlFilter">
                        <th><input placeholder="Nhập Mã" type="text" id="code" onChange={this.onchange}/></th>
                        <th>
                            <select id="seller" className="changeFillter" onChange={this.onchange}>
                                <option value="">Tất Cả</option>
                                {this.state.listFilSell.map((seller)=>
                                <option value={seller.id} key={seller.id}>{seller.name}</option>)}    
                            </select>
                        </th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                        <th>
                            <select id="type" name="changeFillter" onChange={this.onchange}>
                                    <option value="">Tất Cả</option>
                                    <option value="move_sale">Chuyển Bán</option>
                                    <option value="move_regional">Chuyển Liên Khu Vực</option>
                            </select>
                        </th>
                        <th>
                        <select id="state" className="changeFillter" onChange={this.onchange}>
                            <option value="">Tất cả</option>
                            <option value="draft">Chờ luân chuyển</option>
                            <option value="tr_picking">Lấy hàng</option>
                            <option value="tr_picked">Đang luân chuyển</option>
                            <option value="done">Xong</option>
                            <option value="cancel">Hủy</option>
                        </select></th>
                    </tr>
                </thead>
                <tbody>
                {this.state.main.map(main=>
                    <tr key={main.id} className="Item">
                        <td className="code" key={main.code}>{main.code}</td>
                        <td className="seller" key={main.seller}>{main.seller}</td>
                        <td className="create_date" key={main.create_date}>{/*{main.create_date}*/}{this.showDate(main.create_date)}</td>
                        <td className="warehouse" key={main.warehouse}>{main.warehouse}</td>
                        <td className="warehouse_dest" key={main.warehouse_dest}>{main.warehouse_dest}</td>
                        <td className="transfer_type" key={main.transfer_type}>{main.transfer_type === 'move_sale' ? 'Chuyển bán' : 'Chuyển liên khu vực'}</td>
                        <td className="state" key={main.state}>{this.showStatus(main.state)}</td>
                    </tr>)} 
                </tbody>
            </table>
        </div>
        )
    }
}


export default GetApi;