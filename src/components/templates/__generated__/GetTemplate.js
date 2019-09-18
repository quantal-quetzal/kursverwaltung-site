/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTemplate
// ====================================================

export type GetTemplate_findTemplateByID_prerequisites_data = {
  __typename: "Prerequisite",
  /**
   * The document's ID.
   */
  _id: string,
  name: string,
  description: ?string,
  requiresDocumentScan: boolean,
};

export type GetTemplate_findTemplateByID_prerequisites = {
  __typename: "PrerequisitePage",
  /**
   * The elements of type 'Prerequisite' in this page.
   */
  data: Array<?GetTemplate_findTemplateByID_prerequisites_data>,
};

export type GetTemplate_findTemplateByID_tests_data = {
  __typename: "Test",
  /**
   * The document's ID.
   */
  _id: string,
  name: string,
  description: ?string,
  requiresDocumentScan: boolean,
};

export type GetTemplate_findTemplateByID_tests = {
  __typename: "TestPage",
  /**
   * The elements of type 'Test' in this page.
   */
  data: Array<?GetTemplate_findTemplateByID_tests_data>,
};

export type GetTemplate_findTemplateByID = {
  __typename: "Template",
  /**
   * The document's ID.
   */
  _id: string,
  name: string,
  prerequisites: GetTemplate_findTemplateByID_prerequisites,
  tests: GetTemplate_findTemplateByID_tests,
};

export type GetTemplate = {
  /**
   * Find a document from the collection of 'Template' by its id.
   */
  findTemplateByID: ?GetTemplate_findTemplateByID
};

export type GetTemplateVariables = {
  id: string
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