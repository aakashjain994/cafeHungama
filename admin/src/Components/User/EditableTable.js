import React from "react";
import { Table, Modal } from "antd";
import UserDetail from "./UserDetail";
import "./UserDetail.css";

class EditableTable extends React.Component {
  state = {
    visible: false,
    data: [],
    columns: [
      {
        title: "User Name",
        dataIndex: "userName",
        width: "10%",
        key: "userName"
      },
      {
        title: " First Name",
        dataIndex: "firstName",
        width: "12%",
        key: "name"
      },
      {
        title: " Last Name",
        dataIndex: "lastName",
        width: "12%",
        key: "name"
      },
      {
        title: "Email Id",
        dataIndex: "email",
        width: "20%"
      },
      {
        title: "Contact No.",
        dataIndex: "contact",
        width: "15%"
      },
      {
        title: "operation",
        dataIndex: "operation",
        render: (text, record) => {
          return (
            <span>
              <button onClick={this.showModal}>View Details</button>
              <Modal
                title="Details"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <UserDetail detail={record} />
              </Modal>
            </span>
          );
        }
      }
    ]
  };

  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (prevProps.userid !== this.props.userid) {
      const data = this.props.userid[0];
      this.setState({
        data: data
      });
    }
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <Table
        bordered
        dataSource={this.state.data}
        columns={this.state.columns}
        rowKey="userName"
        loading={this.props.loading}
        pagination={{
          onChange: this.cancel
        }}
      />
    );
  }
}

export default EditableTable;
