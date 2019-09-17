import React from "react";
import PropTypes from "prop-types";
import { Navbar, NavbarBrand } from "shards-react";

import { Dispatcher, Constants } from "../../../flux";

class SidebarMainNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
  }

  handleToggleSidebar() {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_SIDEBAR
    });
  }

  render() {
    const { hideLogoText } = this.props;
    return (
      <div className="main-navbar">
        <Navbar
          className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0"
          type="light"
          style={{ height: "88px" }}
        >
          <NavbarBrand
            className="w-100 mr-0"
            href="/"
            style={{ lineHeight: "25px", height: "inherit", textAlign: "center" }}
          >
            <div
              style={{
                display: "block",
                width: "100%",
                height: "inherit"
              }}
            >
              <div
                style={{
                  display: "block"
                }}
              >
                <img
                  id="main-logo"
                  className="d-inline-block align-top mr-1"
                  style={{ maxWidth: "190px" }}
                  src={require("../../../images/MagicTouchERPLogo.png")}
                  alt="Shards Dashboard"
                />
              </div>
              <div
                style={{
                  display: "block",
                  marginTop: "-10px"
                }}
              >
                {!hideLogoText && <span className="d-none d-md-inline ml-1">Magic ERP System</span>}
              </div>
            </div>
          </NavbarBrand>
          {/* eslint-disable-next-line */}
          <a
            className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
            onClick={this.handleToggleSidebar}
          >
            <i className="material-icons">&#xE5C4;</i>
          </a>
        </Navbar>
      </div>
    );
  }
}

SidebarMainNavbar.propTypes = {
  /**
   * Whether to hide the logo text, or not.
   */
  hideLogoText: PropTypes.bool
};

SidebarMainNavbar.defaultProps = {
  hideLogoText: false
};

export default SidebarMainNavbar;
