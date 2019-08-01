import { Table } from "antd";
import React from "react";

class Tab extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "Voucher Name",
          dataIndex: "vouchername",
          key: "vouchername"
        },
        {
          title: "Voucher Amount",
          dataIndex: "amount"
        },
        {
          title: "Validity (yy-mm-dd)",
          dataIndex: "validity"
        },
        {
          title: "Voucher Description",
          dataIndex: "description"
        },
        
      ],
      data: []
    };
  }
  componentDidMount() {
    /* 
    try{
      axios.get(``)
      .then(response=>{
      this.setState({
      data:response.data
      })
      })
    }
    catch(error){
    console.log(error);
    }
    */
  }
  render() {
    return (
      <div>
        <Table
          columns={this.state.columns}
          dataSource={this.state.data}
          bordered
          rowKey="vouchername"
          size="small"
        />
      </div>
    );
  }
}

export default Tab;
