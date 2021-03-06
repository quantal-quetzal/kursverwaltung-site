/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: NewTemplate
// ====================================================

export type NewTemplate_createTemplate_prerequisites_data = {
  __typename: "Prerequisite",
  /**
   * The document's ID.
   */
  _id: string,
  name: string,
  description: ?string,
  requiresDocumentScan: boolean,
};

export type NewTemplate_createTemplate_prerequisites = {
  __typename: "PrerequisitePage",
  /**
   * The elements of type 'Prerequisite' in this page.
   */
  data: Array<?NewTemplate_createTemplate_prerequisites_data>,
};

export type NewTemplate_createTemplate_tests_data = {
  __typename: "Test",
  /**
   * The document's ID.
   */
  _id: string,
  name: string,
  description: ?string,
  requiresDocumentScan: boolean,
};

export type NewTemplate_createTemplate_tests = {
  __typename: "TestPage",
  /**
   * The elements of type 'Test' in this page.
   */
  data: Array<?NewTemplate_createTemplate_tests_data>,
};

export type NewTemplate_createTemplate = {
  __typename: "Template",
  /**
   * The document's ID.
   */
  _id: string,
  name: string,
  prerequisites: NewTemplate_createTemplate_prerequisites,
  tests: NewTemplate_createTemplate_tests,
};

export type NewTemplate = {
  /**
   * Create a new document in the collection of 'Template'
   */
  createTemplate: NewTemplate_createTemplate
};

export type NewTemplateVariables = {
  name: string,
  prerequisites: Array<PrerequisiteInput>,
  tests: Array<TestInput>,
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