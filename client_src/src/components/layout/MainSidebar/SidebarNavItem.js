import React from "react";
import PropTypes from "prop-types";
import { NavLink as RouteNavLink } from "react-router-dom";
import { NavItem, NavLink } from "shards-react";
// import { toast } from "react-toastify";

const SidebarNavItem = ({ item }) => {
  // console.log(item);
  // toast.dismiss();
  return (
    <NavItem
      className={`${
        // item.title === "Orders" || item.title === "Restaurants" ? "upper-seperator" : ""
        item.to.substr(1) === "orders-invoices" ||
        item.to.substr(1) === "stocks" ||
        item.to.substr(1) === "supplier-list"
          ? "upper-seperator"
          : ""
      }
         ${
           //  item.title === "Customers" || item.title === "Add New Restaurant"
           item.to.substr(1) === "customer-contact-list" || item.to.substr(1) === "HR-system"
             ? "lower-seperator"
             : ""
         }`}
    >
      <NavLink tag={RouteNavLink} to={item.to}>
        {item.htmlBefore && (
          <div
            className="d-inline-block item-icon-wrapper"
            dangerouslySetInnerHTML={{ __html: item.htmlBefore }}
          />
        )}
        {item.title && <span>{item.title}</span>}
        {item.htmlAfter && (
          <div
            className="d-inline-block item-icon-wrapper"
            dangerouslySetInnerHTML={{ __html: item.htmlAfter }}
          />
        )}
      </NavLink>
    </NavItem>
  );
};

SidebarNavItem.propTypes = {
  /**
   * The item object.
   */
  item: PropTypes.object
};

export default SidebarNavItem;
