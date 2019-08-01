import React from "react";
import { Card, Icon, Button, Modal, Spin } from "antd";
import EditClientProfile from "./EditClientProfile";
import API from '../../api/API';

class ClientEditPage extends React.Component {
  state = {
    visible: false
  };
  handleCancel = e => {
    this.setState({
      visible: false
    });
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleClose = () => {
    this.setState({
      visible: false,
      confirmLoading: false
    });
    this.props.updateProfile()
  };

  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Button size="large" onClick={this.showModal}>
          Edit
        </Button>
        <Modal
          title="Edit Profile"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={[
            <Button key="submit" type="primary" onClick={this.handleClose}>
              Done
            </Button>
          ]}
        >
          <EditClientProfile data={this.props.data} />
        </Modal>
      </div>
    );
  }
}


class clientProfile extends React.Component {
  state = {
    data: { venues: [] },
    loading: true
  }
  componentDidMount() {
    this.RequestClientDetails()
  }
  RequestClientDetails = async () => {
    //This function for API
    const response = await API.get('/client/5d368a7f4a915e2c58f34952/profile/')
    if (response.data == null || response.data === "") {
      this.setState({
        data: {
          firstName: "EnterName",
          lastName: "",
          contact: "Fill Details",
          alternatenumber: null,
          email: "Fill Details",
          line1: "Fill Details",
          city: "",
          state: "",
          pincode: "",
          venues: []
        },
        loading: false
      })
    }
    else {
      this.setState({ data: response.data, loading: false })
    }
  }
  updateProfile = () => {
    this.RequestClientDetails();
  }
  render() {
    let data = this.state.data
    return (
      <div style={{}}>
        <Card
          title="Profile"
          headStyle={{
            background: "#1c2430",
            textAlign: "center",
            color: "white",
            padding: "1em"
          }}
          style={{ width: "90%", border: "solid 1px black", margin: "auto" }}
        >
          <div style={{ textAlign: "center" }}>
            <Spin spinning={this.state.loading} size="large" tip="Loading" />
          </div>
          <h3>
            <Icon type="user" /> {data.firstName} {data.lastName}
          </h3>
          <h3>
            <Icon type="phone" /> {data.contact}
          </h3>
          <h3>
            <Icon type="phone" /> {data.alternateContact}(Alternate)
        </h3>
          <h3>
            <Icon type="mail" /> {data.email}
          </h3>
          <h3>
            <Icon type="appstore" /> Registered Venues : {data.venues.length}
          </h3>
          <h3>
            <Icon type="home" /> {data.line1Add},{data.line2Add},{data.city},
          {data.state}
          </h3>
          <ClientEditPage data={this.state.data} updateProfile={this.updateProfile} />
        </Card>
      </div>
    );
  };
}

export default clientProfile;
