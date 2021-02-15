import * as React from 'react'
import { Layout } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom'
import Sider from '../../components/layout/sider'
import Routers from '../../routers'
import HeaderComponent from '../../components/layout/header'
import Footer from '../../components/layout/footer'
import './index.scss'
const { Content } = Layout
interface IProps{
  collapsed:boolean
  history:any
}
interface IState {
  authorized?: boolean,
  collapsed?: boolean
}
export default class DivLayout extends React.Component<IProps,IState>{
  constructor(props:any){
    super(props)
    this.state={
      collapsed:false
    }
  }
  logout = () => {
    console.log('退出登陆')
    window.localStorage.clear()
    this.props.history.push('/login')
  }
  changePassWord = () => {
    console.log('修改密码')
  }
  toggleCollapsed = () => {//左侧菜单栏打开收起状态切换
    this.setState({
        collapsed: !this.state.collapsed
    })
  }
  render(){
    console.log(this.props,'22222222222222222')
    const authorized: boolean = localStorage.getItem('auth') ? true : false
    // const authorized: boolean = true
    const { collapsed } = this.state
    return(
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsed={collapsed}/>
        <Layout>
          <HeaderComponent getLogout={this.logout} changePassWord={this.changePassWord} toggleCollapsed={this.toggleCollapsed} collapsed={collapsed} />
          <Content className="layout-content">
            {Routers(authorized)}
          </Content>
          <Footer/>
        </Layout>
      </Layout>
    )
  }
}

