import React from 'react'
import { Form, Input, Button } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import API from '../../api/API';

class EditClientProfileForm extends React.Component {

  state = {
    data: this.props.data        // data variable contains jason before and after Edit
  }
  onEdit = async value => {                    // This function  will Call the API (Post request)
    let profile = {
      firstName: value.firstName,
      lastName: value.lastName,
      contact: value.contact,
      alternateContact: value.alternateContact,
      line1Add: value.line1Add,
      line2Add: value.line2Add,
      email: value.email,
      state: value.state,
      city: value.city
    }
    // eslint-disable-next-line
    const response = await API.put('/client/5d368a7f4a915e2c58f34952/profile/', profile)
      .catch(function (error) {
        alert("Update Failed")
      });
    alert("Submitted");
  }

  log = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ data: values }, () => this.onEdit(this.state.data))
      }
    });

  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form layout="horizontal" onSubmit={this.log} >
          <FormItem label="First Name" >
            {getFieldDecorator("firstName", {
              rules: [
                {
                  required: true,
                  message: 'First Name is Required',
                }
              ],
              initialValue: this.props.data.firstName
            })(<Input />)}
          </FormItem>
          <FormItem label="Last Name">
            {getFieldDecorator("lastName", { initialValue: this.props.data.lastName })(<Input />)}
          </FormItem>
          <FormItem label="Phone Number">
            {getFieldDecorator("contact", {
              rules: [
                {
                  required: true,
                  message: 'Phone Number is Required',
                  pattern: "[1-9][0-9]{9}"
                }
              ], initialValue: this.props.data.contact
            })(<Input />)}
          </FormItem>
          <FormItem label="Alternate Phone Number">
            {getFieldDecorator("alternateContact", {
              rules: [
                {
                  required: false,
                  message: 'Invalid',
                  pattern: "[1-9][0-9]{9}"
                }
              ], initialValue: this.props.data.alternateContact
            })(<Input />)}
          </FormItem>
          <FormItem label="Address">
            {getFieldDecorator('line1Add', {
              rules: [
                {
                  required: true,
                  message: 'Address is Required',
                }
              ], initialValue: this.props.data.line1Add
            })(<Input placeholder="Line" />)}
            {getFieldDecorator('line2Add', { initialValue: this.props.data.line2Add })(<Input Input placeholder="Line 2" />)}
            {getFieldDecorator('city', { initialValue: this.props.data.city })(<Input placeholder="City" />)}
            {getFieldDecorator('state', {
              rules: [
                {
                  required: true,
                  message: 'State is Required',
                }
              ], initialValue: this.props.data.state
            })(<Input Input placeholder="State" />)}
          </FormItem>
          <FormItem label="Email">
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: 'Enter Valid Email',
                  type: "email"
                }
              ], initialValue: this.props.data.email
            })(<Input />)}
          </FormItem>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Edit
              </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
const EditClientProfile = Form.create()(EditClientProfileForm)

export default EditClientProfile