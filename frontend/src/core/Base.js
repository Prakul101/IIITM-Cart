import moment from "moment";
import React from "react";
import Navbar from "./Navbar";

const Base = ({ className = "text-white py-4", children }) => (
  <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
    <Navbar />
    <div className="container-fluid">
      <div className={className}>{children}</div>
    </div>
    <footer className="bg-dark text-white text-lg-start mt-auto">
      <div className="container p-4">
        <div className="row">
          <div className="col-xs-12 col-sm-6 mb-4 mb-sm-0">
            <h5 className="text-uppercase widget-title">
              Developed By<span></span>
            </h5>
            <p className="mt-2">Prakul Tandon</p>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-sm-0">
            <h5 className="widget-title">
              Contact us<span></span>
            </h5>
            <ul className="list-unstyled mb-2 p-0">
              <li className="footer-li">
                <i className="fas fa-envelope" />
                <a href="mailto:info@company-name.com">info@company-name.com</a>
              </li>
              <li className="footer-li">
                <i className="fas fa-phone-alt" />
                <a href="tel:+919999999999">Call us</a>
              </li>
              <li className="mt-2 social">
                <a href="https://facebook.com/" className="me-2">
                  <img src="/images/facebook.png" />
                </a>
                <a href="https://instagram.com/" className="me-2">
                  <img src="/images/instagram.png" />
                </a>
                <a href="https://wa.me/919999999999" className="me-2">
                  <img src="/images/whatsapp.png" />
                </a>
                <a href="https://linkedin.com" className="me-2">
                  <img src="/images/linkedin.png" />
                </a>
                <a href="https://twitter.com">
                  <img src="/images/twitter.png" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center p-3" style={{ backgroundColor: "#1f2326" }}>
        Copyright &copy; {moment().format("YYYY")} COMPANY NAME
      </div>
    </footer>
  </div>
);

export default Base;
