import React from "react";
import { connect } from "react-redux";
import { Nav } from "shards-react";

import SidebarNavItem from "./SidebarNavItem";
import { getSidebarItems } from "../../../actions/GeneralAction";
// import { Store } from "../../../flux";

class SidebarNavItems extends React.Component {
  componentDidMount() {
    // if (Object.keys(this.props.navItems).length === 0) {
    this.props.getSidebarItems();
    // }
  }
  componentDidUpdate() {
    if (Object.keys(this.props.navItems).length === 0) {
      this.renderNavItems();
    }
  }

  renderNavItems = items =>
    (this.props.navItems || items).map((item, idx) => <SidebarNavItem key={idx} item={item} />);

  render() {
    const { navItems: items } = this.props;
    // console.log(` hey man ${this.props.navItems}`);
    if (Object.keys(this.props.navItems).length === 0) {
      return (
        <div className="nav-wrapper">
          <p>Loading ...</p>
        </div>
      );
    }
    return (
      <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">{this.renderNavItems(items)}</Nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    navItems: state.general.sidebarItems
  };
};

export default connect(
  mapStateToProps,
  {
    getSidebarItems
  }
)(SidebarNavItems);
