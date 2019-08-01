import React from 'react'
import './PaymentsHistory.css'
import { Table } from 'antd';
import API from '../../api/API'


class ManagePayments extends React.Component {
    state = {
        transactions: [],
        data: {
            totalBussiness: 0,
            paymentsDone: 0,
            balanceLeft: 0
        }
    }
    //API function for bussiness details
    getDataBussiness = async () => {
        // eslint-disable-next-line
        const response = await API.get('client/5d3dc6f4d8c9905a982fe04f/dashboard/stats')
        this.setState({
            data: {
                // totalBussiness: response.data.total_business_done,
                totalBussiness: 0,
                paymentsDone: 0,
                balanceLeft: 0
            }
        })
    }
    //API function to get Transactions
    getDataTransactions = async () => {
        const response = await API.get('client/5d3dc6f4d8c9905a982fe04f/payments/get')
        console.log(response.data)
        this.setState({
            transactions: response.data
            // [
            //     {
            //         key: '1',
            //         transactionID: "3434JHS",
            //         date: "05/06/2010",
            //         openingBalance: 50000,
            //         amount: 30000,
            //         closingBalance: 20000
            //     },
            //     {
            //         key: '2',
            //         transactionID: "3434JHS",
            //         date: "05/06/2010",
            //         openingBalance: 50000,
            //         amount: 30000,
            //         closingBalance: 20000
            //     }
            // ]
        })
    }
    componentDidMount = () => {
        this.getDataTransactions();
        this.getDataBussiness();
    }
    columns = [
        {
            title: "Transaction ID",
            dataIndex: "transaction_id",
            key: "transaction_id",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Opening Balance",
            dataIndex: "opening_balance",
            key: "opening_balance",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
        }, {
            title: "Closing Balance",
            dataIndex: "closing_balance",
            key: "closing_balance",
        }
    ]
    render() {
        const data = this.state.data;
        const dataTable = this.state.transactions;
        return (
            <div>
                <div className="details">
                    <div><h3>Total Bussiness</h3><h3>{data.totalBussiness}</h3></div>
                    <div><h3>Payment Done</h3><h3>{data.paymentsDone}</h3></div>
                    <div><h3>Balance Left</h3><h3>{data.balanceLeft}</h3></div>
                </div>
                <div className="transactionTable">
                    <Table columns={this.columns} dataSource={dataTable} bordered />
                </div>
            </div>
        )
    }
}

export default ManagePayments