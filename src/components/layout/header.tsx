import * as React from 'react'
import { Popover,Layout} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from '@ant-design/icons';
import { connect } from 'react-redux';
const { Header } = Layout

interface HProps {
  props?: any,
  getLogout?: () => void,
  changePassWord?: () => void,
  toggleCollapsed?: () => void,
  collapsed?: boolean
  currentLocation:string
}
interface IState {
  collapsed: Boolean
}
class HeaderComponent extends React.Component<HProps, IState>{
  constructor(props: any) {
    super(props)
  }
  render(){
    const { collapsed } = this.props
    return(
      <Header style={{background:'#fff',display:'flex',padding:0,alignItems:'center'}}>
        <div onClick={this.props.toggleCollapsed} style={{width:'20px'}}>
          {
            collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
          }
        </div>
        <div style={{flex:1,visibility:collapsed?'visible':'hidden',display:'flex',alignItems:'center'}}>您当前所在的位置：
        {this.props.currentLocation}
        </div>
        <div style={{width:'100px',marginRight:'20px'}}>
          <Popover trigger="click" placement="bottomRight" content={
              <div style={{cursor:'pointer'}}>
                  <div onClick={this.props.changePassWord}>修改密码</div>
                  <div onClick={this.props.getLogout}>退出登录</div>
              </div>
          }>
            <div  style={{cursor:'default'}}>
              <UserOutlined />Users
            </div>
          </Popover>
        </div>
      </Header>
    )
  }
}
let mapStateToProps=(state:any)=>{
  return{
    currentLocation:state.currentLocation
  }
}
export default connect(mapStateToProps)(HeaderComponent)