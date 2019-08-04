import React from "react";
import { Table, Button } from "antd";
import API from "../../api/API";
class Notifications extends React.Component {
  state = {
    columns: [
      {
        title: "Notification",
        dataIndex: "notification",
        render: (text, record) => (
          <span>
            {record.read === true ? (
              <td>{text}</td>
            ) : (
              <td>
                {text}&nbsp;&nbsp;
                <Button
                  onClick={this.handleClick}
                  type="primary"
                  style={{marginRight:0 }}
                >
                  Mark as read
                </Button>
              </td>
            )}
          </span>
        )
      }
    ],
    data: []
  };
  componentDidMount() {
    try {
      API.get(`/client/5d38a08cd561f03a18743855/notifications/all`).then(
        response => {
          this.setState({
            data: response.data
          });
        }
      );
    } catch (e) {
      console.log(e);
      // this.setState({ loading: false });
    }
  }
  handleClick = e => {
    /* try {
      API.put(`/client/5d38a08cd561f03a18743855/notifications/all`)
    }
    catch(error){
    console.log(error)
    }
    */
  };
  render() {
    const { data, columns } = this.state;

    return <Table dataSource={data} columns={columns} />;
  }
}
export default Notifications;
