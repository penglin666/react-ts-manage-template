import * as React from 'react'
import { Layout} from 'antd'
const { Footer } = Layout
export default class FooterComponent extends React.Component{
  constructor(props: any) {
    super(props)
  }
  render(){
    return(
      <Footer style={{textAlign:'center'}}>
        <span>github地址：</span>
        <a href="https://github.com/penglin666/react-ts-manage-template.git">https://github.com/penglin666/react-ts-manage-template.git</a>
      </Footer>
    )
  }
}