import React from "react";
import { Table } from "antd";
import axios from "axios";
class App extends React.Component {
  state = {
    columns: [
      {
        title: "Transaction Id",
        dataIndex: "transaction_id"
      },
      {
        title: "Client First Name",
        dataIndex: "client_firstName"
      },
      {
        title: "Client Last Name",
        dataIndex: "client_lastName"
      },
      {
        title: "Client Comany",
        dataIndex: "client_companyName"
      },
      {
        title: "Date of transaction",
        dataIndex: "date"
      },
      {
        title: "Opening Balance",
        dataIndex: "opening_balance"
      },
      {
        title: "Amount Paid",
        dataIndex: "amount"
      },
      {
        title: "Closing Balance",
        dataIndex: "closing_balance"
      }
    ],
    data: []
  };
  componentDidMount() {
    //call api
    try {
      axios
        .get(
          `https://cafehungama.herokuapp.com/superadmin/superadminid/payments/get`
        )
        .then(response => {
          this.setState({ data: response.data });
        });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <Table
        columns={this.state.columns}
        dataSource={this.state.data}
        bordered
      />
    );
  }
}

export default App;
