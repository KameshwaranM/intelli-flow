import React, { useState } from "react";
import "./Business-Settings-Billing-Upgrade.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Sidebar/Sidebar";

const BusinessSettingsBillingUpgrade = () => {
  const [planSelected, setPlanSelected] = useState("");
  const navigate = useNavigate();

  const handlePlanSelected = (plan) => {
    return () => {
      setPlanSelected(plan);
      console.log(planSelected);
    };
  };
  const handleUpgrade = () => {
    navigate("/billing/upgrade/checkout");
  };
  return (
    <div className="bsBillingUpgarde">
      <Sidebar />
      <div className="bsBillingUpgarde-container">
        {planSelected === "" && (
          <>
            <div className="plan plan-small">
              <button className="plan-btn">SMALL</button>
              <h5>$ 750 / Month</h5>
              <p>Great for Small Teams, Startups and proof-of-concepts</p>
              <ul>
                <li>3 Projects</li>
                <li>10 Workflows</li>
                <li>5 Users</li>
                <li>90 Days Retention</li>
              </ul>
              <button
                className="select-btn"
                onClick={handlePlanSelected("small")}
              >
                SELECT
              </button>
            </div>
            <div className="plan plan-mid">
              <button className="plan-btn">MID</button>
              <h5>$ 1500 / Month</h5>
              <p>For Business with Production workflows and more features.</p>
              <ul>
                <li>5 Projects</li>
                <li>25 Workflows</li>
                <li>10 Users</li>
                <li>180 Days Retention</li>
                <li>Audit Logs</li>
                <li>3 On-Premise Executors</li>
                <li>2 Hour Priority Support</li>
              </ul>
              <button
                className="select-btn"
                onClick={handlePlanSelected("mid")}
              >
                SELECT
              </button>
            </div>
            <div className="plan plan-large">
              <button className="plan-btn">LARGE</button>
              <h5>$ 2000 / Month</h5>
              <p>
                For Larger teams with multiple departments and more workflows
              </p>
              <ul>
                <li>10 Projects</li>
                <li>50 Workflows</li>
                <li>25 Users</li>
                <li>365 Days Retention</li>
                <li>Audit Logs</li>
                <li>5 On-Premise Executors</li>
                <li>30 Minutes Response</li>
                <li>Dedicated Support</li>
                <li>1 Automation Engineer</li>
              </ul>
              <button
                className="select-btn"
                onClick={handlePlanSelected("large")}
              >
                SELECT
              </button>
            </div>
          </>
        )}
        {planSelected === "small" && (
          <section className="selected-plan">
            <div className="plan plan-small">
              <button className="plan-btn">SMALL</button>
              <h5>$ 750 / Month</h5>
              <p>Great for Small Teams, Startups and proof-of-concepts</p>
              <ul>
                <li>3 Projects</li>
                <li>10 Workflows</li>
                <li>5 Users</li>
                <li>90 Days Retention</li>
              </ul>
              <button
                className="select-btn"
                onClick={handlePlanSelected("small")}
              >
                SELECT
              </button>
            </div>
            <div className="t-c">
              <input type="checkbox" className="tc-checkbox" />
              <label htmlFor="">
                I hereby acknowledge and agree to the Intelli Flow{" "}
                <a href="/Dashboard">Terms and Conditions</a> and{" "}
                <a href="/Dashboard">Privacy policy</a>
              </label>
              <br />
              <button className="next-btn" onClick={handleUpgrade}>
                NEXT
              </button>
            </div>
          </section>
        )}

        {planSelected === "mid" && (
          <section className="selected-plan">
            <div className="plan plan-mid">
              <button className="plan-btn">MID</button>
              <h5>$ 1500 / Month</h5>
              <p>For Business with Production workflows and more features.</p>
              <ul>
                <li>5 Projects</li>
                <li>25 Workflows</li>
                <li>10 Users</li>
                <li>180 Days Retention</li>
                <li>Audit Logs</li>
                <li>3 On-Premise Executors</li>
                <li>2 Hour Priority Support</li>
              </ul>
              <button
                className="select-btn"
                onClick={handlePlanSelected("mid")}
              >
                SELECT
              </button>
            </div>
            <div className="t-c">
              <input type="checkbox" className="tc-checkbox" />
              <label htmlFor="">
                I hereby acknowledge and agree to the Intelli Flow{" "}
                <a href="/Dashboard">Terms and Conditions</a> and{" "}
                <a href="/Dashboard">Privacy policy</a>
              </label>
              <br />
              <button className="next-btn" onClick={handleUpgrade}>
                NEXT
              </button>
            </div>
          </section>
        )}

        {planSelected === "large" && (
          <section className="selected-plan">
            <div className="plan plan-large">
              <button className="plan-btn">LARGE</button>
              <h5>$ 2000 / Month</h5>
              <p>
                For Larger teams with multiple departments and more workflows
              </p>
              <ul>
                <li>10 Projects</li>
                <li>50 Workflows</li>
                <li>25 Users</li>
                <li>365 Days Retention</li>
                <li>Audit Logs</li>
                <li>5 On-Premise Executors</li>
                <li>30 Minutes Response</li>
                <li>Dedicated Support</li>
                <li>1 Automation Engineer</li>
              </ul>
              <button
                className="select-btn"
                onClick={handlePlanSelected("large")}
              >
                SELECT
              </button>
            </div>
            <div className="t-c">
              <input type="checkbox" className="tc-checkbox" />
              <label htmlFor="">
                I hereby acknowledge and agree to the Intelli Flow{" "}
                <a href="/Dashboard">Terms and Conditions</a> and{" "}
                <a href="/Dashboard">Privacy policy</a>
              </label>
              <br />
              <button className="next-btn" onClick={handleUpgrade}>
                NEXT
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default BusinessSettingsBillingUpgrade;
