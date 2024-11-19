  // eslint-disable-next-line no-unused-vars
import React from 'react';
import './Footer.css';
import twitter from './../../assets/images/twitter-logo.png';
import linkedin from './../../assets/images/linkedin-logo.png';
import insta from './../../assets/images/insta-logo.png';

const Footer = () => {
  return (
    <div className="footer">
      <div className="sb__footer__section__padding">
        <div className="sb__footer-links">
          <div className="sb__footer-links_div">
            <h4>Home</h4>
            <a href="/">
              
            </a>
            <a href="/feedback">
              <p>About us</p>
            </a>
          </div>
          <div className="sb__footer-links_div">
            <h4>Services</h4>
            <a href="/upload">
              <p>Document Upload</p>
            </a>
          </div>
          <div className="sb__footer-links_div">
            <h4>Partners</h4>
            <a href="https://youtube.com/shorts/SXHMnicI6Pg?si=tKdFW0_OqnyLgllU">
              <p>DevOps team</p>
            </a>
          </div>
          <div className="sb__footer-links_div">
            <h4>Feedback</h4>
            <a href="https://www.instagram.com/sanju_ghasal/">
              <p>Email</p>
            </a>
            <a href="https://www.instagram.com/wake_up_amit/">
              <p>Contact Number</p>
            </a>
          </div>
          <div className="sb__footer-links_div">
            <h4>Social</h4>
            <div className="socialmedia">
              <a href="https://www.instagram.com/__vaibhavvvvv_/">
                <img src={twitter} alt="twitterimage" />
              </a>
              <a href="https://www.instagram.com/sanju_ghasal/">
                <img src={insta} alt="fbimage" />
              </a>
              <a href="https://www.instagram.com/wake_up_amit/">
                <img src={linkedin} alt="linkedinimage" />
              </a>
            </div>
          </div>
        </div>
        <hr />
        <div className="sb__footer-below">
          <div className="sb__footer-copyright">
            <p>
              @{new Date().getFullYear()} CodeInn. All rights reserved.
            </p>
          </div>
          {/* <div className="sb__footer-below-links">
            <a href="/terms">
              <div><p>Privacy</p></div>
            </a>
            <a href="/terms">
              <div><p>Security</p></div>
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
