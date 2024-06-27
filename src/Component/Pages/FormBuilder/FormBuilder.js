import $ from "jquery";
import React, { Component, createRef, useEffect, useState } from "react";
import SidebarMenu from "../../Sidebar/Sidebar";
import './Formbuilder.css'
import { URL_Create_Workflow_Form } from "../../API/ProjectAPI";
import { useLocation, useSearchParams } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

const formData = [];


class FormBuilder extends Component {
    fb = createRef();
    formBuilderInstance = null;
  
    componentDidMount() {
      this.initializeFormBuilder();
    }
  
    initializeFormBuilder = () => {
      this.formBuilderInstance = $(this.fb.current).formBuilder({
          formData,
          i18n: {
              locale: 'en-US',
              messages: {
                  'en-US': {
                      header: "Header",
                  }
              }
          }
      });
  
      $(this.fb.current).on('click', '.btn-group>.btn:last-child:not(:first-child)', this.handleSubmit);
  }

  handleSubmit = async () => {
    try {
      // Get the form data from the form builder instance
      const savedFormData = this.formBuilderInstance.actions.getData();
      console.log("Form Data:", JSON.stringify(savedFormData));
  
      // Set up the request headers
      const requestHeaders = {
        'Content-Type': 'application/json',
        'SESSIONKEY': this.props.sessionKey,
      };
  
      // Create the request body as a JSON string
      const requestBody = JSON.stringify({
        formcontent: JSON.stringify(savedFormData),
        workflowname: this.props.workflowname,
      });
  
      // Send the POST request using fetch API
      const response = await fetch(URL_Create_Workflow_Form, {
        method: 'POST',
        headers: requestHeaders,
        body: requestBody,
      });
  
      // Parse the response as JSON
      const data = await response.json();
      console.log("API Response:", data);
  
      // Handle API response (success or error)
      if (response.ok) {
        this.handleApiResponse(data.message || "Form submitted successfully!");
      } else {
        const errorText = `${data.message || 'Unknown error'}`;
        this.handleApiError(errorText);
      }
  
    } catch (error) {
      console.error("Error during API call:", error);
      // Handle network errors or exceptions
      this.handleApiError(`Error: ${error.message}`);
    }
  }
  
  // Method to handle API response toast notification
  handleApiResponse = (message) => {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  }
  
  // Method to handle API error toast notification
  handleApiError = (errorText) => {
    toast.error(errorText, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  }
  


  render() {
    return (
      <div style={{width:"100%" , padding:"0px 20px"}}>
        <div className="react-formbuilder-cont" id="fb-editor" ref={this.fb} />
      </div>
    );
  }
}

function FlowFormBuilder() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const workflowname = searchParams.get('workflowname');
  const [sessionKey, setSessionKey] = useState(null);

  useEffect(() => {
    const sessionKey = localStorage.getItem("sessionKey");
    setSessionKey(sessionKey);
  }, []);
  return (
    <div style={{display:"flex"}}>
        <SidebarMenu />
        <React.StrictMode>
            <FormBuilder sessionKey={sessionKey} workflowname={workflowname} />
        </React.StrictMode>
        <ToastContainer />
    </div>
  );
}

export default FlowFormBuilder;