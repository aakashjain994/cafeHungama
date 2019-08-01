import { Table } from "antd";
import React from "react";
//import axios from "axios";
import API from "../../api/API";

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "Date",
          dataIndex: "createdAt"
        },
        {
          title: "Issue Subject",
          dataIndex: "issue_subject",
          key: "issue_subject"
        },
        {
          title: "Issue Explanation",
          dataIndex: "issue_explanation"
        },
        {
          title: "Issue Comment",
          dataIndex: "issue_comment"
        },
        {
          title: "Immediate Contact",
          dataIndex: "immediate_contact"
        },
        {
          title: "Status",
          dataIndex: "status"
        }
      ],
      data: [],
      loading: true
    };
  }
  componentDidMount() {
    this.callApi();
  }
  callApi() {
    try {
      this.setState({ loading: true });
      API.get(`/client/5d09eb072f965c7314727e4b/support`).then(response => {
        this.setState({ data: response.data.reverse(), loading: false });
      });
    } catch (e) {
      console.log(e);
      this.setState({ loading: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.items !== this.props.items) {
      this.setState({ loading: true });
      API.post("/client/5d09eb072f965c7314727e4b/support", this.props.items)
        .then(() => {
          console.log("yoy");
          this.callAPI();
        })
        .catch(error => {
          console.log(error);
          console.log("Error");
          this.callApi();
        });
    }
  }
  render() {
    return (
      <div>
        <Table
          columns={this.state.columns}
          dataSource={this.state.data}
          bordered
          rowKey="issue_subject"
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default Tab;
