/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOpenCourses
// ====================================================

export type GetOpenCourses_allFilteredCourses_instructor = {
  __typename: "Instructor",
  firstName: ?string,
  lastName: ?string,
};

export type GetOpenCourses_allFilteredCourses_template = {
  __typename: "Template",
  name: string,
};

export type GetOpenCourses_allFilteredCourses = {
  __typename: "Course",
  /**
   * The document's ID.
   */
  _id: string,
  name: string,
  description: ?string,
  start: ?any,
  end: ?any,
  city: ?string,
  currentPhase: Phase,
  instructor: ?GetOpenCourses_allFilteredCourses_instructor,
  template: GetOpenCourses_allFilteredCourses_template,
};

export type GetOpenCourses = {
  allFilteredCourses: Array<GetOpenCourses_allFilteredCourses>
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