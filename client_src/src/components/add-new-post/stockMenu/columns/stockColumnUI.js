import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "shards-react";
import styled from "styled-components";
// import InnerList from "./innerList";
import AddStockDetails from "./addStockDetails";

const ContainerMainDiv = styled.div`
  margin: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
  width: 400px;
  min-width: 400px;

  display: flex;
  flex-direction: column;
`;
const TitleContainerDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TitleHTag = styled.h6`
  padding: 8px;
`;

const AddProductDetailsContainerDiv = styled.div`
  display: flex;
  & > input {
    margin-right: 10px;
  }
`;

export class StockColumnUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isDeleteConfirmed: false
    };
    // funcs
    this.toggle = this.toggle.bind(this);
  }

  componentWillUnmount() {
    this.deleteConfirmDefault();
    this.setValid();
  }

  setValid = () => this.setState({ invalid: false, valid: true });
  setInValid = () => this.setState({ invalid: true, valid: false });

  deleteConfirmDefault = () => this.setState({ isDeleteConfirmed: false });
  deleteIsConfirmed = () => this.setState({ isDeleteConfirmed: true });

  toggle() {
    this.setState({ open: !this.state.open });
  }

  deletColumnHandler = columnId => {
    this.deleteIsConfirmed();
    this.toggle(); // closing model
    console.log(`deletColumnHandler with columnId ${columnId}`); // column id, which when is selected
    // console.log(columnId); // column id, which when is selected
    // NOTE: calling parent to remove the column
    this.props.removeStockItemColumn(columnId);
  };

  render() {
    /*
     * NOTE: Category VALUE is encodeURIComponent so decodeURIComponent to before showing
     * Decode and Display Category VALUE
     */
    const { title } = this.props.column;
    const { open } = this.state;
    return (
      <ContainerMainDiv>
        <TitleContainerDiv>
          <TitleHTag>{decodeURIComponent(title)}</TitleHTag>
          <Button onClick={this.toggle} outline squared size="sm" style={{ height: "35px" }}>
            <i className="material-icons">close</i>
          </Button>
          <Modal open={open} toggle={this.toggle}>
            <ModalHeader>Confirm</ModalHeader>
            <ModalBody>
              <p>
                Are you sure? <u>You can NOT undo this action!</u>.
              </p>
              <Button onClick={this.deletColumnHandler.bind(this, this.props.columnId)}>
                Yes, Delete Product Column
              </Button>
            </ModalBody>
          </Modal>
        </TitleContainerDiv>
        <AddProductDetailsContainerDiv>
          <AddStockDetails
            name={this.props.name}
            stockItemDetails={this.props.stockItemDetails}
            columnId={this.props.columnId}
            updateStockItemColumn={this.props.updateStockItemColumn}
          />
        </AddProductDetailsContainerDiv>
      </ContainerMainDiv>
    );
  }
}

export default StockColumnUI;
