// @flow
import * as React from "react"
import { Router } from "@reach/router"
import Layout from "../Layout"
import type { Template, Prerequisite, Test } from "../Types"
import { Form, List, Input, Button, Checkbox, Icon } from "antd"

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
  onSave?: Template => void,
  template?: Template,
}

export default (props: Props) => {
  const [template, setTemplate] = React.useState<Template>(
    props.template
      ? props.template
      : {
          name: "",
          prerequisites: [],
          tests: [],
        }
  )

  const [nextTempID, setNextTempID] = React.useState(2)
  const getNextTempID = (prefix: string): string => {
    const i = nextTempID
    setNextTempID(i + 1)
    return "NEW" + i.toString()
  }

  const [newPrerequisite, setNewPrerequisite] = React.useState<Prerequisite>({
    _id: "NEW p1",
    name: "",
    description: "",
    requiresDocumentScan: false,
  })

  const [newTest, setNewTest] = React.useState<Test>({
    _id: "NEW t1",
    name: "",
    description: "",
    requiresDocumentScan: false,
  })

  return (
    <div>
      <Form
        onSubmit={e => {
          props.onSave && props.onSave(template)
          e.preventDefault()
        }}
      >
        <h2>Vorlage</h2>
        <Form.Item required={true}>
          <Input
            placeholder="Vorlagenname"
            disabled={props.readOnly}
            value={template.name}
            onChange={e =>
              setTemplate({
                ...template,
                name: e.target.value,
              })
            }
          />
        </Form.Item>
        {!props.readOnly && (
          <Form.Item>
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

      <h2>Voraussetzungen</h2>
      <List
        size="small"
        itemLayout="vertical"
        dataSource={template.prerequisites}
        renderItem={(item: Prerequisite) => (
          <List.Item
            style={{
              boxShadow: "0px 0px 65px -41px rgba(0,0,0,0.75)",
              backgroundColor: "white",
              margin: "15px 0 15px 0",
              padding: 10,
            }}
          >
            <List.Item.Meta
              title={
                <div>
                  <span>{item.name}&nbsp;&nbsp;&nbsp;</span>
                  {!props.readOnly && (
                    <Button
                      icon="delete"
                      type="danger"
                      size="small"
                      onClick={e => {
                        setTemplate({
                          ...template,
                          prerequisites: template.prerequisites.filter(
                            p => !(p._id == item._id)
                          ),
                        })
                      }}
                    >
                      Löschen
                    </Button>
                  )}
                </div>
              }
            />
            <p>{item.description}</p>
            <Checkbox disabled={true} checked={item.requiresDocumentScan}>
              benötigt ein Belegdokument
            </Checkbox>
          </List.Item>
        )}
      />

      {!props.readOnly && (
        <div style={{ border: "solid black 1px", padding: 10 }}>
          <h3>Neue Voraussetzungen hinzufügen</h3>
          <Form
            onSubmit={e => {
              setTemplate({
                ...template,
                prerequisites: [...template.prerequisites, newPrerequisite],
              })
              setNewPrerequisite({
                _id: getNextTempID("p"),
                name: "",
                description: "",
                requiresDocumentScan: false,
              })
              e.preventDefault()
            }}
            {...formItemLayout}
          >
            <Form.Item label="Name">
              <Input
                value={newPrerequisite.name}
                onChange={e =>
                  setNewPrerequisite({
                    ...newPrerequisite,
                    name: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Beschreibung">
              <Input
                value={newPrerequisite.description}
                onChange={e =>
                  setNewPrerequisite({
                    ...newPrerequisite,
                    description: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Checkbox
                checked={newPrerequisite.requiresDocumentScan}
                onChange={e => {
                  console.log(e.target.checked)
                  setNewPrerequisite({
                    ...newPrerequisite,
                    requiresDocumentScan: e.target.checked,
                  })
                }}
              >
                benötigt ein Belegdokument
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" icon="plus" />
            </Form.Item>
          </Form>
        </div>
      )}

      <h2>Prüfungen</h2>
      <List
        size="small"
        itemLayout="vertical"
        dataSource={template.tests}
        renderItem={(item: Test) => (
          <List.Item
            style={{
              boxShadow: "0px 0px 65px -41px rgba(0,0,0,0.75)",
              backgroundColor: "white",
              margin: "15px 0 15px 0",
              padding: 10,
            }}
          >
            <List.Item.Meta
              title={
                <div>
                  <span>{item.name}&nbsp;&nbsp;&nbsp;</span>
                  {!props.readOnly && (
                    <Button
                      icon="delete"
                      type="danger"
                      size="small"
                      onClick={e => {
                        setTemplate({
                          ...template,
                          tests: template.tests.filter(
                            t => !(t._id == item._id)
                          ),
                        })
                      }}
                    >
                      Löschen
                    </Button>
                  )}
                </div>
              }
            />
            <p>{item.description}</p>
            <Checkbox disabled={true} checked={item.requiresDocumentScan}>
              benötigt ein Belegdokument
            </Checkbox>
          </List.Item>
        )}
      />
      {!props.readOnly && (
        <div style={{ border: "solid black 1px", padding: 10 }}>
          <h3>Neue Prüfung hinzufügen</h3>
          <Form
            onSubmit={e => {
              setTemplate({
                ...template,
                tests: [...template.tests, newTest],
              })
              setNewTest({
                _id: getNextTempID("t"),
                name: "",
                description: "",
                requiresDocumentScan: false,
              })
              e.preventDefault()
            }}
            {...formItemLayout}
          >
            <Form.Item label="Name">
              <Input
                value={newTest.name}
                onChange={e =>
                  setNewTest({
                    ...newTest,
                    name: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Beschreibung">
              <Input
                value={newTest.description}
                onChange={e =>
                  setNewTest({
                    ...newTest,
                    description: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Checkbox
                checked={newTest.requiresDocumentScan}
                onChange={e => {
                  console.log(e.target.checked)
                  setNewTest({
                    ...newTest,
                    requiresDocumentScan: e.target.checked,
                  })
                }}
              >
                benötigt ein Belegdokument
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" icon="plus" />
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  )
}
