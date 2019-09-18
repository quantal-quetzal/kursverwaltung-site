/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCourse
// ====================================================

export type GetCourse_findCourseByID_instructor = {
  __typename: "Instructor",
  firstName: ?string,
  lastName: ?string,
};

export type GetCourse_findCourseByID_template = {
  __typename: "Template",
  name: string,
};

export type GetCourse_findCourseByID = {
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
  instructor: ?GetCourse_findCourseByID_instructor,
  template: GetCourse_findCourseByID_template,
};

export type GetCourse = {
  /**
   * Find a document from the collection of 'Course' by its id.
   */
  findCourseByID: ?GetCourse_findCourseByID
};

export type GetCourseVariables = {
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