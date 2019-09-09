import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
import MainFooter from "../components/layout/MainFooter";

const DefaultLayout = ({ children, isFull, noSideBar, noNavbar, noFooter }) => (
  <Container fluid>
    <Row>
      {!noSideBar && <MainSidebar />}
      {isFull ? (
        <Col
          className={isFull ? "fullLayout main-content p-0" : "normalLayout main-content p-0"}
          lg={{ size: 12 }}
          tag="main"
        >
          {!noNavbar && <MainNavbar />}
          {children}
          {!noFooter && <MainFooter copyright={`Copyright © ${new Date().getFullYear()}`} />}
        </Col>
      ) : (
        <Col
          className="main-content p-0"
          lg={{ size: 10, offset: 2 }}
          md={{ size: 9, offset: 3 }}
          sm="12"
          tag="main"
        >
          {!noNavbar && <MainNavbar />}
          {children}
          {!noFooter && <MainFooter copyright={`Copyright © ${new Date().getFullYear()}`} />}
        </Col>
      )}
    </Row>
  </Container>
);

DefaultLayout.propTypes = {
  isFull: PropTypes.bool,
  noSideBar: PropTypes.bool,
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

DefaultLayout.defaultProps = {
  noNavbar: false,
  noFooter: false,
  noSideBar: false,
  isFull: false
};

export default DefaultLayout;
