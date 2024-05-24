import React from "react";
import '../../Pages/EmailVerify/index.css';
import Logo from "../../../Assests/Intellil-Flow-Logo.png";

const ExpiredEmail = () => {

    const handleClick =()=>{
        window.location.href="/SignUp"
    }
    return (
        <div className="inbox-content">
            <header className="inbox-content-img">
                <img src={Logo} alt="images" />
            </header>
            <section className="inbox-content-sec1">
                <h4>Email verifcation link has expired.</h4>
                <p>Click below button, Kindly Signup again.</p>
            </section>
            <div className="password-content-sec1">
                <button className="Expire-Email-page-button" onClick={handleClick}>SignUp</button>
            </div>
        </div>
    );
};

export default ExpiredEmail;
