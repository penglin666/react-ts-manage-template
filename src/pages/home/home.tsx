import * as React from "react"
export default class Home extends React.Component<any> {
  render() {
    console.log(this.props,'首页的')
    return (
      <h1>
        首页
      </h1>
    )
  }
}