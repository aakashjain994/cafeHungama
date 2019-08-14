import { Skeleton, Switch, Card, Icon, Avatar,Row,Col,Select } from 'antd';
import Loader from 'react-loader-spinner';
import React from 'react';
import {withContext} from '../Context';
import googleVM from '../Context';
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
    const bearer = 'Bearer ' + this.props.token;
    fetch(`http://localhost:5000/user/orders`,{
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
                  data.map(details=>
                    <Card title={details.venueName}
                    style={{ width:'80%',margin:'auto',marginTop:'2%',backgroundColor:'white'}}
                      >{
                    details.orders.map(order=>{
                      console.log(order);
                      if(order.status==="not confirmed"){
                        return (
                        /*<Card title={details.venueName}
                    style={{ width:'80%',margin:'auto',marginTop:'2%',backgroundColor:'#f03c3c'}}
                      >*/
                          <Row type="flex"justify="center">
                              <Col span={6} >
                              <h3 style={{color:'#f03c3c'}}>{order.timeSlot}</h3>
                              </Col>
                              <Col span={6}>
                              <h3 style={{color:'#f03c3c'}}>{order.ticketMRP}</h3>
                              </Col>
                              <Col span={6}>
                              <h3 style={{color:'#f03c3c'}}>{500 - parseInt(order.ticketsSold)} remaining</h3>
                              </Col>
                              </Row>
                     // </Card>
                      );
                      }
                      else{
                        return (
                          <Row type="flex"justify="center">
                              <Col span={6} >
                              <h3 style={{color:'#2dc27f'}}>{order.timeSlot}</h3>
                              </Col>
                              <Col span={6}>
                              <h3 style={{color:'#2dc27f'}}>{order.ticketMRP}</h3>
                              </Col>
                              <Col span={6}>
                              <h3 style={{color:'#2dc27f'}}>{500 -parseInt(order.ticketsSold)} remaining</h3>
                              </Col>
                          </Row>
                      );
                      }
                })
              }
              </Card>
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