import React from 'react'
import ReqTable from './Table'
import { Form, Icon, Input, Button, Modal } from 'antd';
import API from '../../api/API'
import AddVoucherForm from './addVoucherForm';
import AddAminites from './addAminites';
import AddLocality from './AddLocality';
import AddCity from './AddCity';


class AddEmployeeForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        API.post('superadmin/superadminid/admins/create', values)
          .catch(function (error) {
            alert("Update Failed")
          });
        alert("Added")
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{
        width: "400px",
        border: "none",
      }}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('pws_id', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Employee ID"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('pws_password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Button type="primary" htmlType="submit">Add</Button>
        </Form>
      </div>
    );
  }
}

const AddEmployee = Form.create({ name: 'addEmployeeForm' })(AddEmployeeForm);

class SuperAdminScreen extends React.Component {
  state = {
    EmployeeData: [{
      adminProfile: {
        firstName: "Loading",
        lastName: "Loading",
        email: "Loading",
        password: "Loading",
        contact: null,
      }
    }]
  }
  defaultadmin = {
    firstName: "Not Fulled",
    lastName: "Not Filled",
    email: "Not Filled",
    password: "nil",
    contact: "Not Filled",
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  getemployeedata = async () => {
    const response = await API.get('superadmin/superadminID/admins/get')
    let data = response.data.map(x => x.adminProfile || this.defaultadmin);
    this.setState({
      EmployeeData: data
    })
  }
  componentDidMount() {
    this.getemployeedata();
  }
  render() {

    return (
      <div>
        {/*<h1>SuperAdmin.NAME</h1>*/}
        <div>
          <Button type="primary" onClick={this.showModal}>
            Features
        </Button>
          <br /><br />
          <Modal
            title="Additions"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <AddVoucherForm />
            <AddAminites />
            <AddLocality />
            <AddCity />
          </Modal>
        </div>
        <h3 style={{ margin: "10px 0 0" }}>Add Admin</h3>
        <AddEmployee />
        <br /><br />
        <h3 style={{ margin: "10px 0 0" }}>List of Admins</h3>
        <ReqTable data={this.state.EmployeeData} />
      </div>
    )
  }
}

export default SuperAdminScreen