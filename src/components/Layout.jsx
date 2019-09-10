// @flow
import * as React from "react"
import { Layout } from "antd"

import "antd/dist/antd.css"

const { Header, Content } = Layout

type Props = {
  children: React.Node,
  pageTitle: string,
}

export default (props: Props) => {
  return (
    <Layout
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        paddingTop: 0,
      }}
    >
      <Header>
        <p style={{ color: "white" }}>{props.pageTitle}</p>
      </Header>
      <Content style={{ padding: "1em" }}>{props.children}</Content>
    </Layout>
  )
}
