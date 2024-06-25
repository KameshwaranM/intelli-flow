import React, { useEffect, useState } from "react";
import "./Business-Settings-Billing-Upgrade.css";
import { useNavigate } from "react-router-dom";
import BusinessSettingsSidebar from "../../../Sidebar/BusinessSettingsSidebar";
import { URL_Upgrade_Plan_DATA } from "../../../API/ProjectAPI";
import axios from "axios";

const BusinessSettingsBillingUpgrade = () => {
  const [planSelected, setPlanSelected] = useState("");
  const navigate = useNavigate();
  const [sessionKey, setSessionKey] = useState(null);


  useEffect(() => {
    const sessionKey = localStorage.getItem("sessionKey");
    setSessionKey(sessionKey);
  }, []);

  useEffect(() => {
    if (planSelected !== "") {
      console.log("plan value",planSelected);
      localStorage.setItem('PlanValue', planSelected);
    }
  }, [planSelected]);

  const handlePlanSelected = (plan) => {
    return () => {
      setPlanSelected(plan);
    };
  };

  const handleUpgrade = async (event) => {
    event.preventDefault();

    try {
        const response = await axios.post(URL_Upgrade_Plan_DATA, {}, {
            headers: {
                'SESSIONKEY': sessionKey,
            }
        });

        if (response.status === 200) {
            console.log("Response received:", response);
            if (response.data && response.data.url) {
                console.log("Redirecting to:", response.data.url);
                window.location.href = response.data.url;
            } else {
                console.error('Invalid response structure: URL not found in the response data', response.data);
            }
        } else {
            console.error('Unexpected response status:', response.status, response.data.message || 'No additional message');
        }
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code outside the range of 2xx
            console.error('Server responded with error:', error.response.status, error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error in request setup:', error.message);
        }
    }
};



  // const handleUpgrade = async () => {
  //   try {
  //     const response = await axios.get(URL_Upgrade_Plan_DATA, {
  //       headers: {
  //         'SESSIONKEY': sessionKey,
  //         'PlanName': planSelected,
  //       }
  //     });
  
  //     if (response.status === 200) {
  //       console.log('Upgrade successful', response.data);
  //     } else {
  //       console.error('Failed to upgrade the plan');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     console.log('Upgrade plan unsuccessful');
  //   }
  // };

  // const handleUpgrade = async () => {
  //   console.log(planSelected,sessionKey)
  //   try {
  //     const response = await fetch(URL_Upgrade_Plan_DATA, {
  //       method: 'PUT',
  //       headers: {
  //         SESSIONKEY : sessionKey, 
  //         PlanName: planSelected,
  //       },
  //     });
  //     console.log(planSelected,sessionKey)

  //     if (!response === 200){
  //       const errorData = await response.json();
  //       throw new Error(errorData.message);
  //     }

  //     const responseData = await response.json();
  //     window.location.href = responseData.url;
  //   } catch (error) {
  //     console.error('Error creating checkout session:', error);
  //     console.log(planSelected,sessionKey)
  //   }
  // };
  
  return (
    <div className="bsBillingUpgarde">
      <BusinessSettingsSidebar />
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
              {/* <button
                className="select-btn"
                onClick={handlePlanSelected("small")}
              >
                SELECT
              </button> */}
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
              {/* <button
                className="select-btn"
                onClick={handlePlanSelected("mid")}
              >
                SELECT
              </button> */}
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
              {/* <button
                className="select-btn"
                onClick={handlePlanSelected("large")}
              >
                SELECT
              </button> */}
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
