/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardBody, ListGroup, ListGroupItem, Button } from "shards-react";

const SidebarActions = ({ title, onSaveEvent, isThisEditing }) => (
  <Card small className="mb-3">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>

    <CardBody className="p-0 restaurant__saveContainer">
      <ListGroup flush>
        <ListGroupItem className="d-flex px-3 border-0">
          <Button
            theme={isThisEditing ? "accent" : "success"}
            size="sm"
            block
            className="ml-auto textWrap saveBtn"
            onClick={onSaveEvent}
          >
            <i className="material-icons">file_copy</i>{" "}
            {isThisEditing ? "Update Restaurant Info" : "Create New Stock!"}
          </Button>
        </ListGroupItem>
      </ListGroup>
    </CardBody>
  </Card>
);

SidebarActions.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

SidebarActions.defaultProps = {
  title: "Actions"
};

export default SidebarActions;
