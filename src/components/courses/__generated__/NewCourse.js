/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: NewCourse
// ====================================================

export type NewCourse_createCourse_instructor = {
  __typename: "Instructor",
  firstName: ?string,
  lastName: ?string,
};

export type NewCourse_createCourse_template = {
  __typename: "Template",
  name: string,
};

export type NewCourse_createCourse = {
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
  instructor: ?NewCourse_createCourse_instructor,
  template: NewCourse_createCourse_template,
};

export type NewCourse = {
  /**
   * Create a new document in the collection of 'Course'
   */
  createCourse: NewCourse_createCourse
};

export type NewCourseVariables = {
  name: string,
  description?: ?string,
  start?: ?any,
  end?: ?any,
  city?: ?string,
  currentPhase: Phase,
  instructor?: ?string,
  template: string,
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