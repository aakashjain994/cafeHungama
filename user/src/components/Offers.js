import React, { Component } from 'react';
import {Card} from 'antd';
import {Row,Col} from 'antd';
import {Button} from 'antd';
import { Input } from 'antd';
const {Meta} = Card;
const { Search } = Input;

class Offers extends Component {
    render() {
        return (
            <div style={{textAlign:'center'}}>
                <h1>Offers</h1>
                 <Card
                    hoverable
                    style={{ width: '30%',margin:'auto' }}
                    cover={<img alt="example" src="https://image.shutterstock.com/image-vector/special-offer-260nw-304412000.jpg" />}
                >
                    <Meta title="Valid for all users" description="This is only one time offer" />
                <div style={{marginTop:'10%'}}>
                <Row type="flex" jusitfy="space-between">
                        <Col span={12}>
                        <Row type="flex" jusitfy="space-between">
                            <Col span={12}>
                                <h3>Name Of Offer</h3>
                            </Col>
                            <Col span={12}>
                                <h3>Get 10% CashBack</h3>
                            </Col>
                        </Row>
                        <Search
                        placeholder="Enter Coupon Code"
                        enterButton="Apply"
                        size="large"
                        onSearch={value => console.log(value)}
                        />
                        </Col>
                       <Col span={12}>
                            <h3>PRICE 100</h3>
                            <Button size="large" type="primary">BUY</Button>
                       </Col>
                </Row>
                </div>
                </Card>
            </div>
        );
    }
}

export default Offers;