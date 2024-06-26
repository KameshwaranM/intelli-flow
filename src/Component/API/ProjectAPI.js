export const BASE_URL = 'http://127.0.0.1:8985/api/v1';
const projectName = localStorage.getItem("projectname");
const planName = localStorage.getItem("PlanValue");

export const URL_Create_Project = `${BASE_URL}/project/createproject`;
export const URL_Get_Project_Name = `${BASE_URL}/project/getallprojectdetails`;
export const URL_Create_Workflow = `${BASE_URL}/workflow/createworkflow`;
export const URL_Get_Workflow_Name = `${BASE_URL}/workflow/getallworkflows?projectname=${projectName}`;
export const URL_GET_Workflow_DATA = `${BASE_URL}/workflowhistory/getworkflowdata`;
export const URL_Upgrade_Plan_DATA = `${BASE_URL}/create_checkout_session?plan=${planName}`;
export const URL_Delete_Workflow_Name = `${BASE_URL}/workflow/deleteworkflow`;
export const URL_Create_Workflow_Form = `${BASE_URL}/workflowform/createworkflowform`;
export const URL_GET_Workflow_Form = `${BASE_URL}/workflowform/getformdata`;
