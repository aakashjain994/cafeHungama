import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Card } from 'antd';
import {Collapse} from 'antd';

const {Panel} = Collapse;
const text = (
    <p style={{ paddingLeft: 24 }}>
      A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
      as a welcome guest in many households across the world.
    </p>
  );

class Wallet extends Component {
    render() {
        return (
            <div style={{marginTop:'10%'}}>
                <Row type="flex" gutter={8} justify="center" align="top">
                    <Col span={9}>
                    <Card  title={<div style={{textAlign:'center'}}><p style={{fontSize:30,marginBottom:-3}}>555</p><h3>Wallet Balance</h3></div>} style={{width:'75%',height:'750px',marginLeft:'auto'}}>
                        <Row type="flex" justify="center">
                            <Col span={5}>
                                <h2>My cash</h2>
                            </Col>
                            <Col offset={15} span={4}>
                                <h2>Rs 0</h2>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center">
                            <Col span={10}>
                                <h2>Reward Bonus</h2>
                            </Col>
                            <Col offset={10} span={4}>
                                <h2>Rs 0</h2>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center" style={{marginTop:'10%'}}>
                            <div style={{textAlign:'center'}}>
                                <h1>Wallet Offers</h1>
                            </div>
                        </Row>
                        <Card  title="FAQS" bordered={false}>
                        <Collapse bordered={false} defaultActiveKey={['1']}>
                            <Panel header="This is panel header 1" key="1">
                            {text}
                            </Panel>
                            <Panel header="This is panel header 2" key="2">
                            {text}
                            </Panel>
                            <Panel header="This is panel header 3" key="3">
                            {text}
                            </Panel>
                        </Collapse>
                        </Card>
                    </Card>
                    </Col>

                    <Col span={15}>
                        <Card title={<div style={{textAlign:'center'}}><h1>Wallet Transactions</h1></div>} style={{width:'75%',height:'750px'}}>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Wallet;