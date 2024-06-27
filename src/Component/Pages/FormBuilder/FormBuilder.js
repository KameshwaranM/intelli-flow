import $ from "jquery";
import React, { Component, createRef, useEffect, useState } from "react";
import SidebarMenu from "../../Sidebar/Sidebar";
import './Formbuilder.css';
import { URL_Create_Workflow_Form, URL_GET_Workflow_Form,  } from "../../API/ProjectAPI"; // Add your API URL for fetching form data
import { useLocation, useSearchParams } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

class FormBuilder extends Component {
  fb = createRef();
  formBuilderInstance = null;
  state = {
    formData: [], // Initialize formData as state
  };

  componentDidMount() {
    this.fetchFormData();
  }

  fetchFormData = async () => {
    try {
      const requestHeaders = {
        'Content-Type': 'application/json',
        'SESSIONKEY': this.props.sessionKey,
      };
  
      const requestBody = JSON.stringify({
        workflowname: this.props.workflowname,
      });
  
      const response = await fetch(URL_GET_Workflow_Form, {
        method: 'POST',
        headers: requestHeaders,
        body: requestBody,
      });
  
      if (response.status === 401) {
        this.handleApiError('Unauthorized access. Please check your session key.');
        return;
      }
  
      const data = await response.json();
  
      if (response.ok) {
        this.setState({ formData: data.data }, this.initializeFormBuilder);
      } else {
        this.handleApiError(data.message || 'Failed to fetch form data');
      }
    } catch (error) {
      console.error("Error during API call:", error);
      this.handleApiError(`Error: ${error.message}`);
    }
  };

  initializeFormBuilder = () => {
    this.formBuilderInstance = $(this.fb.current).formBuilder({
      formData: this.state.formData,
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
  };

  handleSubmit = async () => {
    try {
      const savedFormData = this.formBuilderInstance.actions.getData();
      console.log("Form Data:", JSON.stringify(savedFormData));

      const requestHeaders = {
        'Content-Type': 'application/json',
        'SESSIONKEY': this.props.sessionKey,
      };

      const requestBody = JSON.stringify({
        formcontent: JSON.stringify(savedFormData),
        workflowname: this.props.workflowname,
      });

      const response = await fetch(URL_Create_Workflow_Form, {
        method: 'POST',
        headers: requestHeaders,
        body: requestBody,
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok) {
        this.handleApiResponse(data.message || "Form submitted successfully!");
      } else {
        const errorText = `${data.message || 'Unknown error'}`;
        this.handleApiError(errorText);
      }

    } catch (error) {
      console.error("Error during API call:", error);
      this.handleApiError(`Error: ${error.message}`);
    }
  };

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
  };

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
  };

  render() {
    return (
      <div style={{ width: "100%", padding: "0px 20px" }}>
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
    console.log("Session Key from localStorage:", sessionKey);
    setSessionKey(sessionKey);
  }, []);

  // Render the FormBuilder only if sessionKey is available
  return (
    <div style={{ display: "flex" }}>
      <SidebarMenu />
      <React.StrictMode>
        {sessionKey && workflowname ? (
          <FormBuilder sessionKey={sessionKey} workflowname={workflowname} />
        ) : (
          <div>Loading...</div> // or show some other loading indicator
        )}
      </React.StrictMode>
      <ToastContainer />
    </div>
  );
}

export default FlowFormBuilder;