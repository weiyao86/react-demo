import React, {Component} from 'react';
import {connect} from 'dva';
import {withRouter} from 'dva/router';
import Header from '../../components/header';
import {Form, Icon, Input, Button} from 'antd';
import './index.scss';

@withRouter
@connect(state => state)
@Form.create()
class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      stateLoginIs: this.props.loginis,
    };
  }

  componentDidMount() {}

  hasErrors = fieldsError => Object.keys(fieldsError).some(field => fieldsError[field]);

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
    const formLayout = 'horizontal'; // inline 'vertical'; 'horizontal';
    const formItemLayout = formLayout === 'horizontal' ? {labelCol: {span: 4}, wrapperCol: {span: 14}} : null;
    const buttonItemLayout = formLayout === 'horizontal' ? {wrapperCol: {span: 14, offset: 4}} : null;
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');

    return (
      <div>
        layout
        <Form layout={formLayout} onSubmit={this.handleSubmit}>
          <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''} label="用户名" {...formItemLayout}>
            {getFieldDecorator('username', {
              rules: [{required: true, message: 'Please input your username!'}],
            })(<Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />} placeholder="Username" />)}
          </Form.Item>
          <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''} label="密码" {...formItemLayout}>
            {getFieldDecorator('password', {
              rules: [{required: true, message: 'Please input your Password!'}],
            })(<Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />} type="password" placeholder="Password" />)}
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary" htmlType="submit" disabled={this.hasErrors(getFieldsError())}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Layout;
