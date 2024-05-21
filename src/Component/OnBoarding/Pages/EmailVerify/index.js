import React from "react";
import './index.css';
import Logo from "../../../Assests/auto-intelli-logo.png";

const EmailVerify = () => {
    return (
        <div className="inbox-content">
            <header className="inbox-content-img">
                <img src={Logo} />
            </header>

            <section className="inbox-content-sec1">
                <h4>Please check your inbox</h4>
                <p>Check your email to verify your account</p>
            </section>

            {/* <section className="inbox-content-sec2"></section> */}

            <section className="inbox-content-sec3">
                <div className="stepper-wrapper">
                    <div className="stepper-item completed">
                        <div className="step-counter"></div>
                        <div className="step-name">Verify email</div>
                    </div>
                    <div className="stepper-item active">
                        <div className="step-counter"></div>
                        <div className="step-name">Create Password</div>
                    </div>
                    <div className="stepper-item active">
                        <div className="step-counter"></div>
                        <div className="step-name">Organize data</div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EmailVerify;
