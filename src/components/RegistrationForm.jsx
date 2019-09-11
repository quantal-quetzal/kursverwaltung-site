// @flow
import React from "react"
import { Form, Input, Button, Tooltip, Icon } from "antd"

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 18,
      offset: 6,
    },
  },
}

export type RegistrationData = {
  firstName: string,
  lastName: string,
  email: string,
}

type Props = {
  onRegister: RegistrationData => void,
  loading: boolean,
}

export default (props: Props) => {
  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [email, setEmail] = React.useState("")

  const handleRegister = e => {
    props.onRegister({
      firstName: firstName,
      lastName: lastName,
      email: email,
    })
    e.preventDefault()
  }

  return (
    <Form onSubmit={handleRegister} {...formItemLayout}>
      <Form.Item label="Vorname" required={true}>
        <Input
          disabled={props.loading}
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Nachname" required={true}>
        <Input
          disabled={props.loading}
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        label={
          <span>
            E-Mail-Adresse&nbsp;
            <Tooltip title="An diese Adresse schicken wir eine Bestätigungs-E-Mail mit der du deine Angaben später auch ändern kannst. Die Email-Adresse selbst wird nicht gespeichert.">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
        required={true}
      >
        <Input
          style={{}}
          disabled={props.loading}
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button loading={props.loading} type="primary" htmlType="submit">
          Registrieren
        </Button>
      </Form.Item>
    </Form>
  )
}
