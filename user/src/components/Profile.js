import React, { Component } from 'react'
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  message
} from 'antd';
import {withContext} from '../Context';
const { Option } = Select;
import googleVM from '../Context';
class Profile extends React.Component {

  state = {
      firstName:'',
      lastName:'',
      userName:'',
      email:'',
      city:'',
      address:'',
      contact:''
  }
  handleSubmit = async e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const bearer = 'Bearer ' + this.props.token;
        fetch(`http://${googleVM}/user/profile/update`,{
          method:'PUT',
          headers:{
              'Authorization':bearer,
              "Content-Type": "application/json"
          },
          body:JSON.stringify(values)
      })
      .then(response=>response.json())
      .then(data=>{
          this.setState({loading:false,
          firstName:data.firstName,
          lastName:data.lastName,
          userName:data.userName,
          email:data.email,
          city:data.city,
          address:data.address,
          contact:data.contact
          })
          message.success('Profile succesfully updated',3)
      }
      )
      .catch(err=>{
          console.log(err);
      })
      }
    }
    )
    };
  componentDidMount(){
    const bearer = 'Bearer ' + this.props.token;
    console.log(this.props.token);
    fetch(`http://${googleVM}/user/profile/read`,{
        method:'GET',
        headers:{
            'Authorization':bearer
        }
    })
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        this.setState({loading:false,
        firstName:data.firstName,
        lastName:data.lastName,
        userName:data.userName,
        email:data.email,
        city:data.city,
        address:data.address,
        contact:data.contact
        })
    })
    .catch(err=>{
        console.log(err);
    })
  }
  render() {
     const {firstName,lastName,userName,email,city,address,contact} = this.state;
     const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <Row type="flex" justify="center">
        <Form onSubmit={this.handleSubmit} {...formItemLayout} className="login-form">
        <Form.Item label="First Name">
          {getFieldDecorator('firstName', {
            rules: [{ required: true, message: 'Please input your firstName!' }],
            initialValue:firstName
            })(
            <Input size='large'
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="First Name"

            />,
          )}
        </Form.Item>
        <Form.Item label="Last Name">
          {getFieldDecorator('lastName', {
            rules: [{ required: true, message: 'Please input your last Name!' }],
            initialValue:lastName
          })(
            <Input size='large'
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Last Name"
            />,
          )}
        </Form.Item>
        <Form.Item label="User Name">
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your user Name!' }],
            initialValue:userName
          })(
            <Input size='large'
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="User Name"
            />,
          )}
        </Form.Item>
        <Form.Item label="Email">
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
            initialValue:email
          })(
            <Input size='large'
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="email"
              placeholder="Email"
            />,
          )}
        </Form.Item>
        <Form.Item label="City">
          {getFieldDecorator('city', {
            rules: [{ required: true, message: 'Please enter your city!' }],
            initialValue:city
          })(
            <Input size='large'
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="text"
              placeholder="City"
            />,
          )}
        </Form.Item>
        <Form.Item label="Address">
          {getFieldDecorator('address', {
            rules: [{ required: true, message: 'Please input your Address!' }],
            initialValue:address
          })(
            <Input size='large'
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="text"
              placeholder="Address"
            />,
          )}
        </Form.Item>

        <Form.Item label="Contact number">
          {getFieldDecorator('contact', {
            rules: [{ required: true, message: 'Please input your Contact number!' }],
            initialValue:contact
          })(
            <Input size='large'
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="number"
              placeholder="Contact no"
            />,
          )}
        </Form.Item>


        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Update Profile
          </Button>
        </Form.Item>
      </Form>
      </Row>

    );
  }
}

const WrappedNormalProfileForm = Form.create({ name: 'update_profile' })(Profile);
export default withContext(WrappedNormalProfileForm);