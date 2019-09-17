import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";
import { LogoutCall } from "../../../../actions/AuthAction";

class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  logOut() {
    const { history } = this.props;
    this.props.LogoutCall(history);
  }

  render() {
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={require("./../../../../images/shards-dashboards-logo-success.svg")}
            alt="User Avatar"
          />{" "}
          <span className="d-none d-md-inline-block">ERP Admin</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to="user-profile-erp">
            <i className="material-icons">&#xE7FD;</i> Profile
          </DropdownItem>
          {/* <DropdownItem tag={Link} to="user-profile-erp">
            <i className="material-icons">&#xE8B8;</i> Edit Profile
          </DropdownItem> */}
          {/* <DropdownItem tag={Link} to="file-manager-list">
            <i className="material-icons">&#xE2C7;</i> Files
          </DropdownItem> */}
          <DropdownItem tag={Link} to="getAllOrders">
            <i className="material-icons">&#xE896;</i> Orders
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={this.logOut} className="text-danger">
            <i className="material-icons text-danger">&#xE879;</i> Logout
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}

export default compose(
  withRouter,
  connect(
    null,
    {
      LogoutCall
    }
  )
)(UserActions);
