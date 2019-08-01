import React from "react";
import { WrappedAdvancedSearchForm } from "./AdvancedSearchForm";
import EditableTable from "./EditableTable";
import axios from "axios";

class User extends React.Component {
  state = {
    selecteduser: [],
    loading: true
  };
  componentDidMount() {
    this.onTermSubmit();
  }
  onTermSubmit = async term => {
    try {
      this.setState({ loading: true });
      let str = "";
      if (term[0].userName !== "") str = str.concat("?_id=", term[0].userName);
      if (term[0].email !== "") {
        if (str !== "") str = str.concat("&?email=", term[0].email);
        else str = str.concat("?email=", term[0].email);
      }
      if (term[0].firstName !== "") {
        if (str !== "") str = str.concat("&?firstName=", term[0].firstName);
        else str = str.concat("?firstName=", term[0].firstName);
      }
      if (term[0].lastName !== "") {
        if (str !== "") str = str.concat("&?lastName=", term[0].lastName);
        else str = str.concat("?lastName=", term[0].lastName);
      }
      if (term[0].contact !== "") {
        if (str !== "") str = str.concat("&?contact=", term[0].contact);
        else str = str.concat("?contact=", term[0].contact);
      }
      const response = await axios.get(
        `https://cafehungama.herokuapp.com/admin/users${str}`
      );
      this.setState({ selecteduser: [response.data], loading: false });
    } catch (e) {
      console.log("error: ", e);
      this.setState({ loading: false });
    }
  };
  render() {
    return (
      <div>
        <WrappedAdvancedSearchForm onSubmit={this.onTermSubmit} />

        <EditableTable
          userid={this.state.selecteduser}
          loading={this.state.loading}
        />
      </div>
    );
  }
}
export default User;
