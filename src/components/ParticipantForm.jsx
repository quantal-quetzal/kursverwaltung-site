// @flow
import React from "react"
import {
  Form,
  Input,
  DatePicker as BrowserDatePicker,
  Button,
  Tooltip,
  Icon,
} from "antd"

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

export type ParticipantFormData = {
  firstName: string,
  lastName: string,
  dateOfBirth: Date,
  email: string,
}

type Props = {
  onSubmit: ParticipantFormData => void,
}

export default (props: Props) => {
  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [dateOfBirth, setDateOfBirth] = React.useState(new Date())
  const [email, setEmail] = React.useState("")

  const handleSubmit = e => {
    props.onSubmit({
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      email: email,
    })
    e.preventDefault()
  }

  return (
    <Form onSubmit={handleSubmit} {...formItemLayout}>
      <Form.Item label="Vorname" required={true}>
        <Input value={firstName} onChange={e => setFirstName(e.target.value)} />
      </Form.Item>
      <Form.Item label="Nachname" required={true}>
        <Input value={lastName} onChange={e => setLastName(e.target.value)} />
      </Form.Item>
      <Form.Item label="Geburtsdatum" required={true}>
        <BrowserDatePicker
          onChange={(date, datestring) => setDateOfBirth(new Date(datestring))}
          format="DD.MM.YYYY"
          placeholder="Geburtsdatum wählen"
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
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Registrieren
        </Button>
      </Form.Item>
    </Form>
  )
}
