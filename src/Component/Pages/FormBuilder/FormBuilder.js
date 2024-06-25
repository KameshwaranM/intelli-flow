import $ from "jquery";
import React, { Component, createRef } from "react";
import SidebarMenu from "../../Sidebar/Sidebar";
import './Formbuilder.css'

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

const formData = [
  {
    type: "header",
    subtype: "h4",
    label: "Header"
  }
];

class FormBuilder extends Component {
    fb = createRef();
    formBuilderInstance = null;
  
    componentDidMount() {
      this.initializeFormBuilder();
    }
  
    initializeFormBuilder = () => {
        this.formBuilderInstance = $(this.fb.current).formBuilder({ formData });
    
        $(this.fb.current).on('click', '.btn-group>.btn:last-child:not(:first-child)', () => {
          const savedFormData = this.formBuilderInstance.actions.getData();
          console.log("Form Data:",JSON.stringify(savedFormData));
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
  return (
    <div style={{display:"flex"}}>
        <SidebarMenu />
        <React.StrictMode>
            <FormBuilder />
        </React.StrictMode>
    </div>
  );
}

export default FlowFormBuilder;