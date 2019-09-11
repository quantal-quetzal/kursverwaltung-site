// @flow
import * as React from 'react';
import { Modal, Button } from "antd"

type Props = {
  children: React.Node,
  okHandler: () => void,
}

export default (props: Props) => {
  const [visible, setVisible] = React.useState(true)
  return (
    <Modal
      title="Modal"
      visible={visible}
      onOk={() => {
        setVisible(false)
        props.okHandler()
      }}
      onCancel={() => {
        setVisible(false)
      }}
      okText="Bestätigen"
    >
      {props.children}
    </Modal>
  )
}
