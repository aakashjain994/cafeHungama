import { Skeleton, Switch, Card, Icon, Avatar,Row,Col,Select } from 'antd';
import Loader from 'react-loader-spinner';
import React from 'react';
import {withContext} from '../Context';
const { Meta } = Card;
const {Option} = Select;

class MyOrders extends React.Component {
  state = {
    loading: true,
    data:''
  };

  onChange = checked => {
    this.setState({ loading: !checked });
  };

  handleChange = value => {
    console.log(`selected ${value}`);
  }

  componentDidMount(){
    const bearer = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVkNDFiY2Q2MzZhYWU3Mzg0MTZmZGQxMSIsImVtYWlsIjoiaGFyaXNoY2hlbm51cGF0aTJAZ21haWwuY29tIn0sImlhdCI6MTU2NDY2MDE4MX0.bO90AbCLVJY3P9UPX3x8WKYTl4FW3Glt-XTMeieyifg';
    fetch(`http://localhost:5000/user/orders/5d342f20bac84723fd192b84`,{
        method:'GET',
        headers:{
            'Authorization':bearer
        }
    })
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        this.setState({loading:false,data:data})
    })
    .catch(err=>{
        console.log(err);
    })
  }

  render() {
    const { loading,data } = this.state;
    console.log(data);

    return (
      <div>
          <div style={{textAlign:'center'}}>
            <h1>My Orders</h1>
          </div>
          <Row type="flex" justify="center">
            <Col span={14}>
            {
              (data==='')?(
                <Loader type="ThreeDots" color="#000000" height={200} width={200} />)
              :(
                <React.Fragment>{
                  data.map(details=>{
                    if(details.status==="not confirmed"){
                    return (
                    <Card
                style={{ width:'80%',margin:'auto',marginTop:'2%',backgroundColor:'#f03c3c'}}
                  >
                      <Row type="flex"justify="center">
                          <Col span={6} >
                          <h3 style={{color:'white'}}>1-2</h3>
                          </Col>
                          <Col span={6}>
                          <h3 style={{color:'white'}}>{details.ticketMRP}</h3>
                          </Col>
                          <Col span={6}>
                          <h3 style={{color:'white'}}>{parseInt(details.minTickets) -parseInt(details.ticketsSold)} remaining</h3>
                          </Col>

                      </Row>
                  </Card>
                  );
                  }
                  else{
                    return (
                        <Card
                style={{ width:'80%',margin:'auto',marginTop:'2%',backgroundColor:'#2dc27f'}}
                  >
                      <Row type="flex"justify="center">
                          <Col span={6} >
                          <h3 style={{color:'white'}}>1-2</h3>
                          </Col>
                          <Col span={6}>
                          <h3 style={{color:'white'}}>{details.ticketMRP}</h3>
                          </Col>
                          <Col span={6}>
                          <h3 style={{color:'white'}}>{parseInt(details.minTickets) -parseInt(details.ticketsSold)} remaining</h3>
                          </Col>

                      </Row>
                  </Card>
                  );
                  }
                }
                )
                }
                </React.Fragment>
              )
            }
            </Col>
            <Col span={10}>
                <Card style={{width:'80%',marginTop:'3%'}} title="Nearest Venue List">

                </Card>
            </Col>
          </Row>
      </div>
    );
  }
}

export default withContext(MyOrders);