import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Menu, Icon, Avatar } from "antd";
import Bank from "../Components/Bank/BankDetails";
import Booking from "../Components/Booking/booking";
import Coupon from "../Components/Coupon/Coupon";
import Dashboard from "../Components/Dashboard/Dashboard";
import Notifications from "../Components/Notification/Notification";
import Payment from "../Components/Payment/PaymentsHistory";
import Profile from "../Components/Profile/ClientProfile";
import Support from "../Components/Support/App";
import Venue from "../Components/Venue/Venue";
import Footer from "./Footer";
const { Header, Content, Sider } = Layout;

class RouterApp extends React.Component {
  state = {
    collapsed: false,
    sider: "1",
    header: ""
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  handleClick = e => {
    this.setState({
      sider: "",
      header: e.key
    });
  };
  handlevertical = e => {
    this.setState({
      sider: e.key,
      header: ""
    });
  };

  render() {
    return (
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            >
            <div style={{ color: "white" }}>
              <br />
              <Avatar size="large" icon="user" />
              &nbsp;
              <span>Welcome, Client</span>
            </div>
            <Menu
              theme="dark"
              selectedKeys={[this.state.sider]}
              defaultSelectedKeys={["6"]}
              onSelect={this.handlevertical}
            >
              <Menu.Item key="1">
                <Icon type="home" />
                <span>Dashboard</span>
                <Link to="/" />
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="environment" />
                <span>Manage Venue</span>
                <Link to="/venue" />
              </Menu.Item>
              <Menu.Item key="3" disabled>
                <Icon type="hdd" />
                <span>Manage Coupon</span>
                <Link to="/coupon" />
              </Menu.Item>
              <Menu.Item key="4" disabled>
                <Icon type="schedule" />
                <span>Manage Booking</span>
                <Link to="/booking" />
              </Menu.Item>
              <Menu.Item key="5">
                <Icon type="interaction" />
                <span>Manage Payments</span>
                <Link to="/payment" />
              </Menu.Item>
              <Menu.Item key="6">
                <Icon type="bank" />
                <span>Bank Details</span>
                <Link to="/bank" />
              </Menu.Item>
              <Menu.Item key="7">
                <Icon type="solution" />
                <span>Support</span>
                <Link to="/support" />
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: 0, paddingLeft: 16 }}>
              <div>
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                  style={{ cursor: "pointer" }}
                  onClick={this.toggle}
                />{" "}
                LOGO
                <Menu
                  mode="horizontal"
                  style={{ float: "right" }}
                  onSelect={this.handleClick}
                  selectedKeys={[this.state.header]}
                >
                  <Menu.Item key="1">
                    <Icon type="notification" />
                    <span>Notifications</span>
                    <Link to="/notifications" />
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Icon type="profile" />
                    <span>Profile</span>
                    <Link to="/profile" />
                  </Menu.Item>
                </Menu>
              </div>
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                minHeight: 280
              }}
            >
              <Route path="/bank" component={Bank} />
              <Route path="/booking" component={Booking} />
              <Route path="/coupon" component={Coupon} />
              <Route exact path="/" component={Dashboard} />
              <Route path="/notifications" component={Notifications} />
              <Route path="/payment" component={Payment} />
              <Route path="/profile" component={Profile} />
              <Route path="/support" component={Support} />
              <Route path="/venue" component={Venue} />
            </Content>
           
          </Layout>
        </Layout>
        <Footer />
      </Router>
    );
  }
}
//ReactDOM.render(<RouterApp />, document.getElementById("root"));
export default RouterApp;
