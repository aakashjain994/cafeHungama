import React, { Component } from 'react';

import { Form, Icon, Input, Button, Checkbox,Row } from 'antd';
import {withContext} from '../Context';
class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
       this.props.login(values).then((data)=>{
                this.props.history.push('/');
       })
      }
    });
  };

  render() {

    const { getFieldDecorator } = this.props.form;
    return (
      <Row type="flex" justify="center">
        <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" style={{float:'right'}} href="">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%'}}>
            Log in
          </Button>
          Or <a href="" >Login!</a>
        </Form.Item>
      </Form>
      </Row>

    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default withContext(WrappedNormalLoginForm);