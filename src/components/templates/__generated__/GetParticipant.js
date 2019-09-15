/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetParticipant
// ====================================================

export type GetParticipant_findTemplateByID_prerequisites_data = {
  __typename: "Prerequisite",
  _id: string,
  name: string,
  description: ?string,
  requiresDocumentScan: boolean,
};

export type GetParticipant_findTemplateByID_prerequisites = {
  __typename: "PrerequisitePage",
  data: Array<?GetParticipant_findTemplateByID_prerequisites_data>,
};

export type GetParticipant_findTemplateByID_tests_data = {
  __typename: "Test",
  _id: string,
  name: string,
  description: ?string,
  requiresDocumentScan: boolean,
};

export type GetParticipant_findTemplateByID_tests = {
  __typename: "TestPage",
  data: Array<?GetParticipant_findTemplateByID_tests_data>,
};

export type GetParticipant_findTemplateByID = {
  __typename: "Template",
  _id: string,
  name: string,
  prerequisites: GetParticipant_findTemplateByID_prerequisites,
  tests: GetParticipant_findTemplateByID_tests,
};

export type GetParticipant = {
  findTemplateByID: ?GetParticipant_findTemplateByID
};

export type GetParticipantVariables = {
  id: string
};/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export type PrerequisiteInput = {|
  template?: ?PrerequisiteTemplateRelation,
  name: string,
  description?: ?string,
  requiresDocumentScan: boolean,
|};

export type PrerequisiteTemplateRelation = {|
  create?: ?TemplateInput,
  connect?: ?string,
|};

export type TemplateInput = {|
  name: string,
  prerequisites?: ?TemplatePrerequisitesRelation,
  tests?: ?TemplateTestsRelation,
|};

export type TemplatePrerequisitesRelation = {|
  create?: ?Array<?PrerequisiteInput>,
  connect?: ?Array<?string>,
  disconnect?: ?Array<?string>,
|};

export type TemplateTestsRelation = {|
  create?: ?Array<?TestInput>,
  connect?: ?Array<?string>,
  disconnect?: ?Array<?string>,
|};

export type TestInput = {|
  template?: ?TestTemplateRelation,
  name: string,
  description?: ?string,
  requiresDocumentScan: boolean,
|};

export type TestTemplateRelation = {|
  create?: ?TemplateInput,
  connect?: ?string,
|};

//==============================================================
// END Enums and Input Objects
//==============================================================