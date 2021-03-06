import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalHeader, FormInput } from "shards-react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import InnerList from "./innerList";

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
const TaskListDiv = styled.div`
  padding: 8px;
  transition: background-color: 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? "skyblue" : "white")};

  flex-grow: 1;
  //min-height: 100px;
`;

const AddTasksContainerDiv = styled.div`
  display: flex;
  & > input {
    margin-right: 10px;
  }
`;

export class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isDeleteConfirmed: false
    };
    // funcs
    this.toggle = this.toggle.bind(this);
    this.addListItem = this.addListItem.bind(this);
    // ref
    this.menuNameInput = React.createRef();
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
    this.props.removeMenuColumn(columnId);
  };

  /*
   * Add menu NAME handler (name only at first, after this content part comes underneath)
   * NOTE: Menu item name -  bcz of &amp we need to convert this and saved in DB as encodeURIComponent
   * Menu item VALUE
   * finally calling addTaskHandler from parent props to add item in column
   */
  addListItem(whichColumn) {
    // const newMenuName = encodeURIComponent(this.menuNameInput.current.value);
    const newMenuName = encodeURIComponent(this.menuNameInput.current.value);
    console.log(newMenuName);
    if (newMenuName.length === 0 || newMenuName.length < 4) {
      return this.setInValid();
    }
    this.setValid();
    // console.log(`whichColumn = ${whichColumn}`);

    // const currentNoOfTasks = Object.keys(this.props.tasks).length;
    // const newTaskId = `task-${currentNoOfTasks + 1}`;
    const newTaskId = `menu-${this.props.nextId}`;

    // console.log(`newTaskId = ${newTaskId}`);
    // const newTask = this.props.tasks.push({
    //   id: newTaskId,
    //   content: newMenuName
    // });
    const newState = {
      // tasks: { "task-4": { id: "task-4", content: "Menu Name 4" }, ..... }
      tasks: {
        ...this.props.allTasks,
        // newTask with default content obj
        [`${newTaskId}`]: {
          id: newTaskId,
          name: newMenuName,
          /*
           * NOTE: default content after creating the name of menu item
           */
          content: {
            price: "10",
            menuTags: "",
            outOfOrder: "false"
          }
        }
      },
      columns: {
        ...this.props.allColumns,
        ...this.props.allColumns[whichColumn].menuItemIds.push(newTaskId)
      }
    };
    this.props.addTaskHandler(newState);
    this.menuNameInput.current.value = "";
  }

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
                Are you sure? This will delete all respective menu lists. you can undo this action.
              </p>
              <Button onClick={this.deletColumnHandler.bind(this, this.props.columnId)}>
                Yes, Delete Column
              </Button>
            </ModalBody>
          </Modal>
        </TitleContainerDiv>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <TaskListDiv
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              <InnerList
                tasks={this.props.tasks}
                updateListItem={this.props.updateListItem}
                removeList={this.props.removeListItem}
              />
              {provided.placeholder}
              {/*{increase space of Droppable when needed} */}
            </TaskListDiv>
          )}
        </Droppable>
        <AddTasksContainerDiv>
          <FormInput
            id="addMenuItem"
            innerRef={this.menuNameInput}
            valid={this.state.valid}
            invalid={this.state.invalid}
            placeholder={"Enter Menu Name"}
          />
          <Button onClick={this.addListItem.bind(this, this.props.column.id)}>Save</Button>
        </AddTasksContainerDiv>
      </ContainerMainDiv>
    );
  }
}

export default Column;
