import React from "react";
import "./UserDetail.css";
import { Card, Table } from "antd";

class UserDetail extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    balance: "",
    numOfBooking: "",
    bookings: [],
    data: [],
    columns: [
      {
        title: "Date",
        dataIndex: "Date",
        key: "Date"
      },
      {
        title: "Event",
        dataIndex: "Event",
        key: "Event"
      },
      {
        title: "Payment Done",
        dataIndex: "PaymentDone",
        key: "Payment Done"
      },
      {      
        title: "Voucher Applied",
        dataIndex: "voucherName",
        key:"voucherName"
      }
    ]
  };
  componentDidMount() {
    console.log(this.props.detail);
    this.setState({
      data: this.props.detail
    });
  }

  render() {
    const { data, bookings } = this.state;
    return (
      <div>
        <div>
          <h3>
            Name : {data.firstName} {data.lastName}
          </h3>
        </div>
        <div>
          <Card title="Personal Details" style={{ width: 600 }}>
            <p>Balance : {data.balance}</p>
            <p>Number of bookings done : {data.numOfBooking}</p>
          </Card>
        </div>
        <div />
        &nbsp;
        <div>
          <Card title="Booking Details" style={{ width: 900 }}>
            <Table
              columns={this.state.columns}
              dataSource={bookings}                                //will have to change this
              pagination={false}
            />
          </Card>
        </div>
        <div />
      </div>
    );
  }
}
export default UserDetail;
