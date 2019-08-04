import { Skeleton, Switch, Card, Icon, Avatar,Row,Col,Select } from 'antd';
import Loader from 'react-loader-spinner';
import React from 'react';
import {withContext} from '../Context';
const { Meta } = Card;
const {Option} = Select;

class PastBookings extends React.Component {
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
    fetch(`http://localhost:5000/user/bookings/5d342f20bac84723fd192b84`,{
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
            <h1>My Past Bookings</h1>
          </div>
          <Row type="flex" justify="center">
            <Col span={4}>
                <Select size={'large'} defaultValue="Filter by event types" style={{width:'100%',marginLeft:'30%',marginTop:'10%'}} onChange={this.handleChange}>
                  <Option value="Comedy">Comedy</Option>
                  <Option value="Movie">Movie</Option>
                </Select>
            </Col>
            <Col span={20}>
            {
              (data==='')?(
                <Loader type="ThreeDots" color="#000000" height={200} width={200} />)
              :(
                <React.Fragment>{
                  data.map(details=>{
                    return (
                    <Card title="12 July"
                style={{ width:'80%',margin:'auto',marginTop:'2%'}}
                  >
                      <Row type="flex" justify="space-between">
                          <Col span={4}>
                          <h3>{details.eventType}</h3>
                          </Col>
                          <Col span={4}>
                              <h3>{details.venueName}</h3>
                          </Col>
                          <Col span={4}>
                          <h3>{details.status}</h3>
                          </Col>
                          <Col span={4}>
                          <h3>1-2</h3>
                          </Col>
                          <Col span={4}>
                          <h3>{details.ticketMRP}</h3>
                          </Col>

                      </Row>
                  </Card>
                  );
                  })
                }
                </React.Fragment>
              )
            }
            </Col>
          </Row>
      </div>
    );
  }
}

export default withContext(PastBookings);