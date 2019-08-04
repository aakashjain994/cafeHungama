import React from "react";
class Form extends React.Component {
  state = {
    issue_subject: "",
    issue_comment: "",
    issue_explanation: "",
    immediate_contact: ""
  };
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleFormSubmit = e => {
    e.preventDefault();
    const data = [];
    data.push({
      issue_subject: this.state.issue_subject,
      issue_comment: this.state.issue_comment,
      issue_explanation: this.state.issue_explanation,
      immediate_contact: this.state.immediate_contact
    });
    this.props.handleFormSubmit(data);
    this.setState({
      issue_subject: "",
      issue_comment: "",
      issue_explanation: "",
      immediate_contact: ""
    });
  };
  render() {
    return (
      <div id="Form">
        <p>
          <b>CREATE ISSUE:</b>
        </p>
        <form onSubmit={this.handleFormSubmit}>
          <label htmlFor="issue_subject">
            <input
              id="issue_subject"
              placeholder="Subject"
              value={this.state.issue_subject}
              type="text"
              name="issue_subject"
              onChange={this.handleInputChange}
            />
          </label>
          &nbsp;&nbsp;
          <label htmlFor="issue_explanation">
            <input
              id="issue_explanation"
              placeholder="Explanation"
              value={this.state.issue_explanation}
              type="text"
              name="issue_explanation"
              onChange={this.handleInputChange}
            />
          </label>
          &nbsp;&nbsp;
          <label htmlFor="issue_comment">
            <input
              id="issue_comment"
              placeholder="Comments"
              value={this.state.issue_comment}
              type="text"
              name="issue_comment"
              onChange={this.handleInputChange}
            />
          </label>
          &nbsp;&nbsp;
          <label htmlFor="immediate_contact">
            &nbsp;&nbsp;
            <input
              id="immediate_contact"
              placeholder="Immediate Contact"
              value={this.state.immediate_contact}
              type="text"
              name="immediate_contact"
              onChange={this.handleInputChange}
            />
          </label>
          &nbsp;&nbsp;
          <button type="submit" value="Save">
            Add Issue
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
