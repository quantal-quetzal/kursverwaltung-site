// @flow
export type Prerequisite = {
  _id?: string,
  name: string,
  description?: string,
  requiresDocumentScan: boolean,
}

export type PrerequisiteFulfillment = {
  _id?: string,
  prerequisite: Prerequisite,
  fulfilledDate?: Date,
  documentScan: string,
}

export type Test = {
  _id?: string,
  name: string,
  description?: string,
  requiresDocumentScan: boolean,
}

export type TestResult = {
  _id?: string,
  test: Test,
  passedDate?: Date,
  documentScan: string,
}

export type Template = {
  _id?: string,
  name: string,
  prerequisites: Prerequisite[],
  tests: Test[],
}
