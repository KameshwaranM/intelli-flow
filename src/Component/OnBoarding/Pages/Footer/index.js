import React from "react";
import "../Footer/index.css";
import { FaXTwitter } from "react-icons/fa6";
import { TiSocialFacebook } from "react-icons/ti";
import { FaYoutube , FaLinkedin  } from "react-icons/fa";
import { MdOutlineWifiCalling3 } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";

const Footer = () => {

  const handleDemoClick = () => {
    window.location.href = "/Request-a-Demo";
  };

  const handleSignUpClick = () => {
    window.location.href = "/SignUp";
  };

  return (
    <div className="footer">
      <div className="footerContent">
        <p className="FooterStarted">Get Started For Free Today</p>
        <button className="FooterTry" onClick={handleSignUpClick}>Try Autointelli For Free</button>
        <button className="FoorterRequest" onClick={handleDemoClick}>Request A Demo</button>
      </div>
      <div className="mainFooter">
        <div className="leftFooter">
          <img
            className="leftfooterImage"
            src={require("../../../Assests/auto-intelli-logo.png")}
            alt="sss"
          />
          <div className="Footer-Rights">
            <h3 className="Footer-Copyrights">
              &#169; 2024 All Rights Reserved
            </h3>
            <div className="Footer-SocialIcon">
              <div className="Footer-Icons">
                <a href="https://twitter.com/autointelli"><FaXTwitter className="Footer-TwitterIcon" /></a>
              </div>
              <div className="Footer-Ficons">
                <a href="https://www.linkedin.com/company/autointelli/"><FaLinkedin className="Footer-TwitterIcon" /></a>
              </div>
              <div className="Footer-Ficons">
              <a href="https://www.facebook.com/autointelli/"><TiSocialFacebook className="Footer-FacebookIcon" /></a>
              </div>

              <div className="Footer-InstaIcon">
              <a href="https://www.youtube.com/channel/UCaEhgyW1y4zl1rhpBAIiDrw"><FaYoutube className="Footer-InstagramIcon" /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="FooterList">
          <div className="FooterProduct">
            <h3 className="FooterHeading">Product</h3>
          </div>
          <div className="FooterLinkslist">
            <ul className="FooterLinks">
              <li>Features</li>
              <li>Integration</li>
              <li>Changelog</li>
              <li>Roadmap</li>
            </ul>
          </div>

          <div className="FooterCompany">
            <h3 className="FooterCompanyHeading">Company</h3>
            <ul className="FooterCompanyLinks">
              <li>About</li>
              <li>Pricing</li>
              <li>Terms Of Service</li>
              <li>Privacy Policy</li>
              <li>Licenced & Regulation</li>
            </ul>
          </div>
          <div className="FooterSupport">
            <h3 className="FooterSupportHeading">Support</h3>
            <ul className="FooterSupportLinks">
              <li>Sales</li>
              <li>FAQ</li>
              <li>Customer Care</li>
              <li>Get Help</li>
              <li>Try For Free</li>
              <li>Download</li>
            </ul>
          </div>
          <div className="FooterContact">
            <h3 className="FooterContactHeading">Contact Information</h3>
            <div className="FooterContactPhone">
              <MdOutlineWifiCalling3 className="FooterContactPhoneIcon" />
              <p className="PhoneNumber"> +1-571-426-9715</p>
            </div>
            <div className="FooterContactEmail">
              <CiMail className="FooterContactEmailIcon" />
              <p className="FooterEmail">sales@autointelli.com</p>
            </div>
            <div className="FooterContactLocation">
              <IoLocationOutline className="FooterContactMapIcon" />
              <p className="Location">13800, Coppermine Road, Herdon,VA 20171, USA.</p>
            </div>
          </div>

          <div className="Footer-HorizandleLine">
            <hr />
            <div className="Footer-TermService">
              <p>Term Of Services</p>
              <p>Policy Service</p>
              <p>Cookie Policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
