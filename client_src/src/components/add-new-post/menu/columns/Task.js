import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Row, Col, Collapse, FormGroup, FormInput, FormCheckbox } from "shards-react";

const Container = styled.div`
  border: 1px solid lightgray;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDraggingOver ? "lightgreen" : "white")};
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Title = styled.h6`
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 85%;
`;
const Handler = styled.span`
  width: 35px;
  height: 30px;
`;
const RemoveButton = styled.button`
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
`;
const MenuOutOfOrderStatus = styled.strong`
  text-decoration: underline;
  color: ${state => (state.outOfOrderStatus ? "green" : "red")};
  margin-left: 4px;
`;

const Fileds = p => (
  <FormGroup>
    <label htmlFor={p.id}>{p.placeholder}</label>
    <FormInput {...p} />
  </FormGroup>
);

export class Task extends Component {
  /*
   * NOTE: loading also as encodeURIComponent
   */
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: false,
      menuName: props.task.name && props.task.name.length !== 0 ? props.task.name : "",
      menuTags:
        props.task.content.menuTags && Object.keys(props.task.content.menuTags).length !== 0
          ? props.task.content.menuTags
          : "",
      menuPrice: Object.keys(props.task.content).length !== 0 ? props.task.content.price : 10,
      outOfOrderStatus:
        Object.keys(props.task.content).length !== 0
          ? // ? Boolean(props.task.content.outOfOrder)
            props.task.content.outOfOrder === "true"
          : false
    };
    // create a ref to store the textInput DOM element
    this.nameRef = React.createRef();
    this.tagsRef = React.createRef();
    this.priceRef = React.createRef();
    this.outOfOrderRef = React.createRef();
    // func binding
    this.handleRemoveList = this.handleRemoveList.bind(this);
  }

  toggle() {
    return this.setState({ collapse: !this.state.collapse });
  }
  handleRemoveList(id) {
    return this.props.removeList(id);
  }
  /*
   * Common SetState handler for local menu content
   */
  handleChange = (e, outOfOrderStatus) => {
    // name change
    if (e.target.name === "menuName") {
      this.setState({ menuName: encodeURIComponent(e.target.value) });
    }
    // set menu Tags
    if (e.target.name === "menuTags") {
      this.setState({ menuTags: encodeURIComponent(e.target.value) });
    }
    // out of order change
    if (outOfOrderStatus === "outOfOrderStatus") {
      const newState = {};
      newState[outOfOrderStatus] = !this.state[outOfOrderStatus];
      this.setState({ ...this.state, ...newState });
    }
    // Price change
    if (e.target.name === "menuPrice") {
      const priceValue = e.target.value;
      // If the current value passes the validity test then apply that to state
      if (e.target.validity.valid) this.setState({ menuPrice: encodeURIComponent(e.target.value) });
      // If the current val is just the negation sign, or it's been provided an empty string,
      // then apply that value to state - we still have to validate this input before processing
      // it to some other component or data structure, but it frees up our input the way a user
      // would expect to interact with this component
      else if (priceValue === "" || priceValue === "-") this.setState({ menuPrice: priceValue });
    }
    // can we send now?
    const listId = this.props.task.id;
    const contentState = {
      name: encodeURIComponent(this.nameRef.current.value),
      content: {
        price: encodeURIComponent(this.priceRef.current.value),
        menuTags: encodeURIComponent(this.tagsRef.current.value),
        outOfOrder: this.outOfOrderRef.current.value
      }
    };
    // console.log(typeof this.outOfOrderRef.current.value, this.outOfOrderRef.current.value);
    console.log("can we send now List id ", this.props.task.id);
    // Time to send back with new updated values of Particular list
    return this.props.updateListItem(listId, contentState);
  };

  render() {
    /*
     * NOTE: menuName is encodeURIComponent so decodeURIComponent to before showing
     * Decode and Display menu Name
     */
    const { name: menuName, id: menuID } = this.props.task;
    return (
      <Draggable draggableId={menuID} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDragging}
          >
            <TitleContainer>
              <Handler>
                <i {...provided.dragHandleProps} className="material-icons">
                  drag_indicator
                </i>
              </Handler>
              <Title className="m-0" onClick={this.toggle}>
                {decodeURIComponent(menuName)}
              </Title>
              <RemoveButton onClick={this.handleRemoveList.bind(this, menuID)}>
                <i className="material-icons">close</i>
              </RemoveButton>
            </TitleContainer>

            <Collapse open={this.state.collapse}>
              <div className="p-3 mt-3 border rounded">
                <Row>
                  <Col>
                    <Fileds
                      id="menuName"
                      name="menuName"
                      innerRef={this.nameRef}
                      placeholder="Menu Name"
                      value={
                        this.state.menuName === ""
                          ? decodeURIComponent(menuName)
                          : decodeURIComponent(this.state.menuName)
                      }
                      onChange={e => this.handleChange(e)}
                      // onChange={this.handleChange}
                    />
                  </Col>
                  <Col>
                    <Fileds
                      id="menuPrice"
                      name="menuPrice"
                      innerRef={this.priceRef}
                      placeholder="Price"
                      type="tel"
                      pattern="^-?[0-9]\d*\.?\d*$"
                      onChange={this.handleChange}
                      value={this.state.menuPrice}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Fileds
                      id="menuTags"
                      name="menuTags"
                      innerRef={this.tagsRef}
                      placeholder="Specify menu tags use ',' for multiple tags"
                      onChange={e => this.handleChange(e)}
                      value={decodeURIComponent(this.state.menuTags)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormCheckbox
                      id="outOfOrderRef"
                      name="outOfOrderRef"
                      innerRef={this.outOfOrderRef}
                      value={!this.state.outOfOrderStatus}
                      toggle
                      checked={this.state.outOfOrderStatus}
                      onChange={e => this.handleChange(e, "outOfOrderStatus")}
                      className="m-0"
                    >
                      <small>Out of Order Status:</small>
                      <MenuOutOfOrderStatus {...this.state.outOfOrderStatus}>
                        {JSON.stringify(this.state.outOfOrderStatus)}
                      </MenuOutOfOrderStatus>
                    </FormCheckbox>
                  </Col>
                </Row>
              </div>
            </Collapse>
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Task;
