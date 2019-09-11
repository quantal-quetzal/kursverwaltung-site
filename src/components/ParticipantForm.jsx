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

type CourseData = {
  name: string,
}

export type ParticipantData = {
  firstName: string,
  lastName: string,
  street: string,
  houseNumber: string,
  postalCode: string,
  city: string,
  course: CourseData,
}

type Props = {
  onUpdate: ParticipantData => void,
  loading: boolean,
  participantData: ParticipantData,
}

export default (props: Props) => {
  const [participantData, setParticipantData] = React.useState(
    props.participantData
  )

  const handleUpdate = e => {
    // TODO Validate form data
    props.onUpdate(participantData)
    e.preventDefault()
  }

  return (
    <Form onSubmit={handleUpdate} {...formItemLayout}>
      <Form.Item label="Vorname" required={true}>
        <Input
          disabled={props.loading}
          value={participantData.firstName}
          onChange={e =>
            setParticipantData({
              ...participantData,
              firstName: e.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item label="Nachname" required={true}>
        <Input
          disabled={props.loading}
          value={participantData.lastName}
          onChange={e =>
            setParticipantData({
              ...participantData,
              lastName: e.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item label="Straße">
        <Input
          disabled={props.loading}
          value={participantData.street}
          onChange={e =>
            setParticipantData({
              ...participantData,
              street: e.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item label="Hausnummer">
        <Input
          disabled={props.loading}
          value={participantData.houseNumber}
          onChange={e =>
            setParticipantData({
              ...participantData,
              houseNumber: e.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item label="Postleitzahl">
        <Input
          disabled={props.loading}
          value={participantData.postalCode}
          onChange={e =>
            setParticipantData({
              ...participantData,
              postalCode: e.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item label="Stadt">
        <Input
          disabled={props.loading}
          value={participantData.city}
          onChange={e =>
            setParticipantData({
              ...participantData,
              city: e.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button loading={props.loading} type="primary" htmlType="submit">
          Speichern
        </Button>
      </Form.Item>
    </Form>
  )
}
