import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BusinessSettingBilling.css";
import BusinessSettingsSidebar from "../../../Sidebar/BusinessSettingsSidebar";

const BusinessSettingsBilling = () => {
  return (
    <div className="d-flex BS-Billing">
      <BusinessSettingsSidebar />
      <div className="content-containers">
        <div className="Billing page Billing-head">
        <h2 className="intelli-flow-right-side-headline">Billing</h2>
          <div className="container mt-5">
            <div className="row mb-3">
              <div className="col-md-4 mb-3">
                <div className="card Billingpage-custom-card">
                  <div className="card-body Billingpage-Uniquecard">
                    <h5 className="card-title Billingpage-Uniquetitle">Tier</h5>
                    <a
                      href="/Dashboard"
                      className="btn-free Billingpage-Uniquefreebutton"
                    >
                      Free
                    </a>
                    <a
                      href="/BusinessName/Settings/Billing/Upgrade"
                      className="btn btn-primary Billinngpage-Uniquebutton"
                    >
                      Upgrade
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card Billingpage-custom-card">
                  <div className="card-body Billingpage-Uniquecard">
                    <h5 className="card-title Billingpage-Uniquetitle">
                      Members
                    </h5>
                    <p className="card-text Billingpage-Uniquetext">1/2</p>
                    <a
                      href="/Dashboard"
                      className="btn btn-primary Billinngpage-Uniquebutton"
                    >
                      View Members
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card Billingpage-custom-card">
                  <div className="card-body Billingpage-Uniquecard">
                    <h5 className="card-title Billingpage-Uniquetitle">
                      Projects
                    </h5>
                    <p className="card-text Billingpage-Uniquetext">1/1</p>
                    <a
                      href="/Dashboard"
                      className="btn btn-primary Billinngpage-Uniquebutton"
                    >
                      View Projects
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="card Billingpage-custom-card">
                  <div className="card-body Billingpage-Uniquecard">
                    <h5 className="card-title Billingpage-Uniquetitle">
                      Workflows
                    </h5>
                    <p className="card-text Billingpage-Uniquetext">1/5</p>
                    <a
                      href="/Dashboard"
                      className="btn btn-primary Billinngpage-Uniquebutton"
                    >
                      Workflows
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSettingsBilling;
