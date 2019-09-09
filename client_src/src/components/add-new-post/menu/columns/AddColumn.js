import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalHeader, FormInput } from "shards-react";
import styled from "styled-components";
import initialData from "./inital-data";

const Container = styled.div`
  display: flex;
  & > input {
    margin-right: 10px;
  }
`;

export class AddColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      menuInitals: initialData
    };
    this.toggle = this.toggle.bind(this);
    this.textInput = React.createRef();
  }

  componentWillUnmount() {
    this.setValid();
  }

  toggle() {
    this.setState({
      open: !this.state.open
    });
  }

  setValid = () => {
    this.setState({
      invalid: false,
      valid: true
    });
  };

  setInValid = () => {
    this.setState({
      invalid: true,
      valid: false
    });
  };

  handleNewListCreation() {
    /*
     * NOTE: Category VALUE fix because of &amp we need to convert this and saved in DB as encodeURIComponent
     * Category VALUE
     */
    console.log("BEFOREencodeURIComponent=>" + this.textInput.current.value);
    const newCatVal = encodeURIComponent(this.textInput.current.value);
    console.log("AFTERencodeURIComponent=>" + newCatVal);

    // console.log(newCatVal.length, newCatVal);
    if (newCatVal.length === 0) {
      return this.setInValid();
    }
    this.setValid();

    this.props.handler(newCatVal);
    this.toggle();
    return;
  }
  render() {
    const { open } = this.state;
    return (
      <div>
        <Button onClick={this.toggle}>Add Product</Button>
        <Modal open={open} toggle={this.toggle}>
          <ModalHeader>
            <span role="img" aria-label="hi">
              👋
            </span>{" "}
            Please write product name
          </ModalHeader>
          <ModalBody>
            <Container>
              <FormInput
                id="addColumn"
                innerRef={this.textInput}
                valid={this.state.valid}
                invalid={this.state.invalid}
                placeholder={"i.e Breakfast, Lunch, Desserts etc"}
              />
              <Button onClick={this.handleNewListCreation.bind(this)}>Save</Button>
            </Container>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default AddColumn;
