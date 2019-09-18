/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditTemplate
// ====================================================

export type EditTemplate_updateTemplate_prerequisites_data = {
  __typename: "Prerequisite",
  /**
   * The document's ID.
   */
  _id: string,
  name: string,
  description: ?string,
  requiresDocumentScan: boolean,
};

export type EditTemplate_updateTemplate_prerequisites = {
  __typename: "PrerequisitePage",
  /**
   * The elements of type 'Prerequisite' in this page.
   */
  data: Array<?EditTemplate_updateTemplate_prerequisites_data>,
};

export type EditTemplate_updateTemplate_tests_data = {
  __typename: "Test",
  /**
   * The document's ID.
   */
  _id: string,
  name: string,
  description: ?string,
  requiresDocumentScan: boolean,
};

export type EditTemplate_updateTemplate_tests = {
  __typename: "TestPage",
  /**
   * The elements of type 'Test' in this page.
   */
  data: Array<?EditTemplate_updateTemplate_tests_data>,
};

export type EditTemplate_updateTemplate = {
  __typename: "Template",
  /**
   * The document's ID.
   */
  _id: string,
  name: string,
  prerequisites: EditTemplate_updateTemplate_prerequisites,
  tests: EditTemplate_updateTemplate_tests,
};

export type EditTemplate = {
  /**
   * Update an existing document in the collection of 'Template'
   */
  updateTemplate: ?EditTemplate_updateTemplate
};

export type EditTemplateVariables = {
  id: string,
  name: string,
  newPrerequisites: Array<PrerequisiteInput>,
  newTests: Array<TestInput>,
  disconnectPrerequisites: Array<string>,
  disconnectTests: Array<string>,
};/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * 
 */
export type Phase = "FINISHED" | "LOCKED" | "OPEN" | "STARTED" | "UNPUBLISHED";

export type PrerequisiteInput = {|
  template?: ?PrerequisiteTemplateRelation,
  name: string,
  description?: ?string,
  requiresDocumentScan: boolean,
|};
/**
 *  'Prerequisite' input values
 */

export type PrerequisiteTemplateRelation = {|
  create?: ?TemplateInput,
  connect?: ?string,
|};
/**
 *  Allow manipulating the relationship between the types 'Prerequisite' and 'Template' using the field 'Prerequisite.template'.
 */

export type TemplateInput = {|
  name: string,
  prerequisites?: ?TemplatePrerequisitesRelation,
  tests?: ?TemplateTestsRelation,
|};
/**
 *  'Template' input values
 */

export type TemplatePrerequisitesRelation = {|
  create?: ?Array<?PrerequisiteInput>,
  connect?: ?Array<?string>,
  disconnect?: ?Array<?string>,
|};
/**
 *  Allow manipulating the relationship between the types 'Template' and 'Prerequisite'.
 */

export type TemplateTestsRelation = {|
  create?: ?Array<?TestInput>,
  connect?: ?Array<?string>,
  disconnect?: ?Array<?string>,
|};
/**
 *  Allow manipulating the relationship between the types 'Template' and 'Test'.
 */

export type TestInput = {|
  template?: ?TestTemplateRelation,
  name: string,
  description?: ?string,
  requiresDocumentScan: boolean,
|};
/**
 *  'Test' input values
 */

export type TestTemplateRelation = {|
  create?: ?TemplateInput,
  connect?: ?string,
|};
/**
 *  Allow manipulating the relationship between the types 'Test' and 'Template' using the field 'Test.template'.
 */

//==============================================================
// END Enums and Input Objects
//==============================================================