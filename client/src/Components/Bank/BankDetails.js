import React from 'react'
import 'antd/dist/antd.css';
import './BankDetails.css'
import { Card, Button, Modal, Spin } from 'antd';
import AddBankDetails from './AddBankDetails';
import API from '../../api/API';

class EditBankPage extends React.Component {

    state = {
        visible: false,
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    handleOk = () => {
        this.setState({
            visible: false,
            confirmLoading: false,
        });
        this.props.detailsUpdated();
    };


    render() {
        const { visible, confirmLoading } = this.state;
        return (
            <div>
                <Button style={{ width: "100px", margin: "0 0 10px 0" }} size="large" type='primary' onClick={this.showModal}>
                    Add Bank
                </Button>
                <Modal
                    title="Edit Profile"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                            Close
                    </Button>
                    ]}>
                    <AddBankDetails />
                </Modal>
            </div>
        );
    }
}
// Render the Acoount Details
const showBankDetails = datas => {
    let i = 0
    return datas.map(data => {
        i++
        return (
            <div className="bankdetails">
                <div>
                    <h2>Account {i}</h2>
                    <div><h3>Bank </h3><h3>{data.bank}</h3></div>
                    <div><h3>Account Number</h3><h3>{data.account_no}</h3></div>
                    <div><h3>Branch</h3><h3>{data.branch}</h3></div>
                    <div><h3>Mobile Number</h3><h3>{data.contact_no}</h3></div>
                    <div><h3>IFSC</h3><h3>{data.ifsc_code}</h3></div>
                </div>
            </div>

        )
    })

}
class BankDetails extends React.Component {
    state = {
        details: [],
        loading: true
    }
    componentDidMount() {
        this.getBankDetails();
    }
    getBankDetails = async () => {
        const response = await API.get('/client/5d368a7f4a915e2c58f34952/bankdetails')
        this.setState({
            details: response.data,
            loading: false
        })
    }
    detailsUpdated = () => {
        this.getBankDetails();
    }
    render() {
        return (
            <div>
                <Card title="Bank Details" headStyle={{ border: "ridge 2px black", margin: "0" }} bodyStyle={{ padding: "0" }} style={{ border: "solid 1px black", width: "55em", margin: "auto", textAlign: "center" }}>
                    <div>
                        <EditBankPage detailsUpdated={this.detailsUpdated} />
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <Spin spinning={this.state.loading} size="large" tip="Loading" />
                    </div>
                    {showBankDetails(this.state.details)}
                </Card>
            </div>
        )
    }
}

export default BankDetails