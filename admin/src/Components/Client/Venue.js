import React from "react";
import { Table, Switch } from "antd";
import axios from 'axios';

class EnableVenue extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      { title: "Venue", dataIndex: "venueName", key: "venue" },
      {
        title: "Action",
        dataIndex: "status",
        key: "x",
        render: (status) => (
          <span>
             {status==='enabled'?
              (<Switch defaultChecked/>): (<Switch  />   )
             }
          </span>
          
        )
      }
    ];
    this.state = {
      data: [],
      loading: true
    };
  }
  componentDidMount() {
   /* axios.get(
      `https://cafehungama.herokuapp.com/client/5d09067224036b46e40f8d30/venues`
    ).then(res => {
      this.setState({ data: res.data,loading:false });
    });
    */
    this.setState({ data: this.props.detail, loading: false })
  }
  render() {
    return (
      <Table
        pagination={false}
        columns={this.columns}
        expandedRowRender={record => (
          <div>
          <p style={{ margin: 0 }}>Location : {record.line1},{record.city},{record.state},{record.pinCode},{record.country}</p>
          <p style={{ margin: 0 }}>Number Of Screens : {record.noOfScreens}</p>
          <p style={{ margin: 0 }}>Venue Contact : {record.venueContact}</p>
         <p style={{ margin: 0 }}>Ammenties : {record.amenties}</p> 
          </div>
        )}
        dataSource={this.state.data}
        loading={this.state.loading}
      />
    );
  }
}
export default EnableVenue;
