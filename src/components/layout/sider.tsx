import * as React from 'react'
import { Layout, Menu } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../../store'
import {
  HomeOutlined,
  FileSearchOutlined,
  FrownOutlined
} from '@ant-design/icons';
const { Sider } = Layout
const {Item,SubMenu}=Menu
interface ISiderProps extends RouteComponentProps {
  collapsed?: boolean,
  dispatch:any,
}
interface IState {
  selectedKeys?: Array<string>,
  openKeys?: Array<string>
}
interface Path { key: string, title: string, path?: string }
const menuList = [
  { key: '1', title: '首页', path: '/home', icon: <HomeOutlined /> },
  {
    key: '2', title: '关于我们', icon: <FileSearchOutlined />,
    children: [
      {
        key: '2-1', title: '关于', path: '/about', icon: <FrownOutlined />
    }]
  },
]

class SiderComponent extends React.Component<ISiderProps, IState>{
  constructor(props: any) {
    super(props)
    this.state = {
      selectedKeys: [],
      openKeys: []
    }
  }
  UNSAFE_componentWillMount(){
    // 根据浏览器当前url判断并且打开当前的menu
    const currentPath=this.props.location.pathname;
    if(currentPath==='/'){//默认打开首页
      this.props.history.push('/home')
      this.setState({
        selectedKeys:['1']
      })
      this.props.dispatch(actions.changeLocation(menuList[0].title))
    }
    menuList.forEach(item=>{
      if(item.children){
        const sub=item.children.findIndex(child=>child.path===currentPath)//没有符合条件 -1
        if(sub>-1){//有符合条件的
          this.setState({
            selectedKeys: [item.children[sub].key],
            openKeys: [item.key]
          })
        }
      }else{
        if(item.path===currentPath){// 没有二级菜单的话
          this.setState({
            selectedKeys:[item.key]
          })
        }
      }
    })
  }
  // menu的点击事件，跳转到相应的地址
  menuItemClick = (item: any) => {
    let toPath: Path = { key: '', title: '', path: '' }
    menuList.forEach(it=>{
      if(it.children){
        console.log(it.title)
        const sub=it.children.findIndex(child=>child.key===item.key)
        if(sub>-1){
          toPath=it.children[sub]
          const subTitle:string=it.title+'-'+toPath.title;
          this.props.dispatch(actions.changeLocation(subTitle))
        }
      }else{
        if (it.key === item.key) {
          toPath = it
          this.props.dispatch(actions.changeLocation(toPath.title))
        }
      }
    })
    this.props.history.push(toPath.path)
  }
  render(){
    const { collapsed } = this.props
    const { selectedKeys, openKeys } = this.state
    return(
      <Sider
        collapsed={collapsed}
      >
        <Menu theme={'dark'} onClick={this.menuItemClick} mode="inline" defaultSelectedKeys={selectedKeys} defaultOpenKeys={openKeys}>
          {menuList.map(item=>item.children?
            <SubMenu key={item.key} title={item.title} icon={item.icon}>
              {item.children.map(sub=><Item key={sub.key} icon={sub.icon}>{sub.title}</Item>)}
            </SubMenu>:
            <Item key={item.key} icon={item.icon}>{item.title}</Item>
          )}
        </Menu>
      </Sider>
    )
  }
}
const mapStateToProps=(state:any)=>{
  return{
    currentLocation:state.currentLocation
  }
}
export default connect(mapStateToProps)(withRouter(SiderComponent))