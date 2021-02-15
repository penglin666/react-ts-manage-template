import * as React from 'react'
import { Button, Form, Input } from 'antd'

import './login.scss'
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 16
  }
};
class Login extends React.Component<IProps>{
  handleLogin = (val: any) => {
    console.log('login', val);
    localStorage.setItem('auth', 'true')
    this.props.history.push('/home')

  }
  render() {
    return (
      <div className='form'>
        <div className='logo'>
          <h2>管理系统模板</h2>
        </div>
        <Form onFinish={this.handleLogin}>
          <FormItem label="手机号:" {...formItemLayout} name="userName" rules={[{
            len: 11,
            message: "请输入11位的手机号!"
          },
          {
            pattern: new RegExp("^[0-9]*$"),
            message: "手机号只能为数字!"
          }]}>

            <Input
              placeholder="请输入手机号"
              allowClear
              maxLength={11}
            />
          </FormItem>
          <FormItem label="密码" {...formItemLayout} name="password" rules={[{
            min: 6,
            max: 20,
            message: "请输入6-20位的密码!"
          }]}>

            <Input
              type="password"
              placeholder="请输入密码"
              minLength={6}
              maxLength={20}
              allowClear
            />
          </FormItem>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "200px" }}
            >
              登陆
                </Button>
          </div>
        </Form>
      </div>
    )
  }
}

export default Login