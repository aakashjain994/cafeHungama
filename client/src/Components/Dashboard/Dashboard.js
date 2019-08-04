import React from "react";
import { Tabs } from "antd";
import Payment from "./Payment";
import Request from "./Request";
import Eventsdone from "./Eventsdone";
import Cards from "./Cards";
import API from "../../api/API";
const { TabPane } = Tabs;

class Dashboard extends React.Component {
  state = { size: "small", data: [] };

  onChange = e => {
    this.setState({ size: e.target.value });
  };
  componentDidMount() {
    API.get(`/client/5d38a08cd561f03a18743855/dashboard/stats`).then(res => {
      this.setState({ data: res.data });
    });
  }
  render() {
    const { size } = this.state;
    return (
      <div>
        <Tabs defaultActiveKey="1" size={size}>
          <TabPane tab="Bookings Done" key="1">
            <Eventsdone />
          </TabPane>
          <TabPane tab="Payment" key="2">
            <Payment />
          </TabPane>
          <TabPane tab="Request" key="3">
            <Request />
          </TabPane>
        </Tabs>
        <Cards data={this.state.data} />
      </div>
    );
  }
}
export default Dashboard;
