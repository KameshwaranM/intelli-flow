export const BASE_URL = 'http://127.0.0.1:8985/api/v1';
const projectName = localStorage.getItem("projectname");

export const URL_Create_Project = `${BASE_URL}/project/createproject`;
export const URL_Get_Project_Name = `${BASE_URL}/project/getallprojectdetails`;
export const URL_Create_Workflow = `${BASE_URL}/workflow/createworkflow`;
export const URL_Get_Workflow_Name = `${BASE_URL}/workflow/getallworkflows?projectname=${projectName}`;