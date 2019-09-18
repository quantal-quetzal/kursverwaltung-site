// @flow
import * as React from "react"
import type { Course, Phase } from "../Types"
import { useQuery } from "@apollo/react-hooks"
import {
  Form,
  List,
  Input,
  Select,
  Button,
  Checkbox,
  Icon,
  DatePicker,
  Tooltip,
} from "antd"
import { GET_ALL_TEMPLATES } from "../templates/TemplateQueries"
import { GET_ALL_INSTRUCTORS } from "../instructors/InstructorQueries"
import { message } from "antd"
import type { GetAllTemplates } from "../templates/__generated__/GetAllTemplates"
import type { GetAllInstructors } from "../instructors/__generated__/GetAllInstructors"

const { Option } = Select

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

type Props = {
  readOnly: boolean,
  showSavingIndicator?: boolean,
  onSave?: Course => void,
  newCourse: boolean,
  course?: Course,
}

export default (props: Props) => {
  const [course, setCourse] = React.useState<Course>(
    props.course
      ? props.course
      : {
          name: "",
          currentPhase: "UNPUBLISHED",
        }
  )

  const {
    data: templData,
    loading: templLoading,
    error: templError,
  } = useQuery<GetAllTemplates>(GET_ALL_TEMPLATES)

  const {
    data: instrData,
    loading: instrLoading,
    error: instrError,
  } = useQuery<GetAllInstructors>(GET_ALL_INSTRUCTORS)

  if (templError || instrError) {
    message.error(
      "Es tut uns Leid. Es ist ein schwerer Fehler aufgetreten." +
        " Bitte versuche die Seite neu zu laden: <br/>T:" +
        templError +
        "<br/>I:" +
        instrError
    )
    return null
  }
  const allTemplatesData: GetAllTemplates = templData
  const instructorData: GetAllInstructors = instrData

  return (
    <Form
      onSubmit={e => {
        e.preventDefault()
        props.onSave && props.onSave(course)
      }}
      {...formItemLayout}
    >
      <Form.Item label="Name" required={true}>
        <Input
          disabled={props.readOnly}
          placeholder="Ein Name für den Kurs"
          value={course.name}
          onChange={e =>
            setCourse({
              ...course,
              name: e.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item
        label={
          <span>
            Vorlage&nbsp;
            <Tooltip
              title="Die Vorlage bestimmt, welche Voraussetzungen und 
            Prüfungen für diesen Kurs von den Teilnehmern erbracht werden müssen. Die Vorlage kann nicht nachträglich geändert werden."
            >
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
        required={true}
      >
        <Select
          showSearch={templLoading}
          disabled={props.readOnly || !props.newCourse}
          placeholder="Wähle eine Vorlage für diesen Kurs"
          value={course.templateId}
          onChange={e =>
            setCourse({
              ...course,
              templateId: e,
            })
          }
        >
          {allTemplatesData &&
            allTemplatesData.allTemplates.data.map(d => (
              <Option key={d && d._id} value={d && d._id}>
                {d && d.name}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item label="Startdatum">
        <DatePicker
          value={course.start}
          format="DD.MM.YYYY"
          placeholder="Wann startet der Kurs?"
          onChange={(date, dateString) => {
            setCourse({
              ...course,
              start: date,
            })
          }}
        />
      </Form.Item>
      <Form.Item label="Enddatum">
        <DatePicker
          value={course.end}
          format="DD.MM.YYYY"
          placeholder="Wann ist der Kurs zu Ende?"
          onChange={(date, dateString) => {
            setCourse({
              ...course,
              end: date,
            })
          }}
        />
      </Form.Item>
      <Form.Item label="Stadt">
        <Input
          value={course.city}
          placeholder="Wo findet der Kurs statt?"
          onChange={e => {
            setCourse({
              ...course,
              city: e.target.value,
            })
          }}
        />
      </Form.Item>
      <Form.Item label="Leitung">
        <Select
          showSearch={instrLoading}
          disabled={props.readOnly}
          placeholder="Wer leitet den Kurs?"
          value={course.instructorId}
          onChange={e =>
            setCourse({
              ...course,
              instructorId: e,
            })
          }
        >
          {instructorData &&
            instructorData.allInstructors.data.map(d => (
              <Option key={d && d._id} value={d && d._id}>
                {d &&
                  (d.firstName || "") +
                    " " +
                    (d.lastName || "") +
                    (d.registrationNumber ? ` (${d.registrationNumber})` : "")}
              </Option>
            ))}
        </Select>
      </Form.Item>
      {!props.readOnly && (
        <Form.Item {...tailFormItemLayout}>
          <Button
            loading={props.showSavingIndicator}
            type="primary"
            htmlType="submit"
          >
            Speichern
          </Button>
        </Form.Item>
      )}
    </Form>
  )
}
