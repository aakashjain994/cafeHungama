import { Card } from 'antd';
import React, { Component } from 'react';
import {Row,Col,Button} from 'antd';
import {Link} from 'react-router-dom';
class Vouchers extends Component {
    render() {
        return (
            <div style={{marginTop:'10%'}}>
                <Row type = 'flex' justify = "center">
                    <Card title="Manage Vouchers User" style={{width:'75%'}}>
                        <Row type = 'flex' justify = "space-between">
                        <h1>Vouchers</h1>
                        <Button size = 'large' type="primary"><Link to="/offers">Add Voucher</Link></Button>
                        </Row>
                        <Card type="inner" title="Voucher Name" extra={<h3>Voucher Code</h3>}>
                            <Row type = 'flex' justify = "space-between">
                                <div>Details of the voucher</div>
                                <h3>Voucher Validity</h3>
                            </Row>
                        </Card>
                        <Card type="inner" title="Voucher Name" extra={<h3>Voucher Code</h3>}>
                            <Row type = 'flex' justify = "space-between">
                                <div>Details of the voucher</div>
                                <h3>Voucher Validity</h3>
                            </Row>
                        </Card>
                    </Card>
                </Row>

            </div>
        );
    }
}

export default Vouchers;
