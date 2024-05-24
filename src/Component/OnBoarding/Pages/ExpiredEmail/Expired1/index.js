import React from "react";
import '../../EmailVerify/index.css'
import Logo from "../../../../Assests/Intellil-Flow-Logo.png";

function UserVerifid() {

    const handleClick = () => {
        window.location.href = "/Login"
    }

    return (
        <div className="inbox-content">
            <header className="inbox-content-img">
                <img src={Logo} alt="images" />
            </header>
            <section className="inbox-content-sec1">
                <h4>Reset Password verifcation link has expired.</h4>
                <p>Click below button.</p>
            </section>
            <div className="password-content-sec1">
                <button className="Expire-Email-page-button" onClick={handleClick}>Click here</button>
            </div>
        </div>
    );
};

export default UserVerifid;
