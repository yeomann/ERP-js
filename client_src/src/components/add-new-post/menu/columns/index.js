// import Menu from "./menu";
// export default Menu;
import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
// import initialData from "./inital-data";
import Column from "./column";

const Container = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const MainContainer = styled.div``;

export class Menu extends Component {
  /*
   * NOTE: we are passing the TITLE of category here at title: encodeURIComponent(props.name)
   * are this is repeating with .map from the parent menu.js
   */
  constructor(props) {
    super(props);
    this.state = {
      menuInitialData: {
        // tasks: {
        /* tasks: {
          // "task-1": { id: "task-1", name: "Menu Name 1", content: {}  },
          // "task-2": { id: "task-2", name: "Menu Name 2", content: {} },
        }, */
        tasks: props.menus && Object.keys(props.menus).length !== 0 ? props.menus : {},
        columns: {
          "column-1": {
            id: "column-1",
            // title: props.name !== "" ? encodeURIComponent(props.name) : "",
            title: props.name, // it comes encoded from parent component eg. after addNewMenuColumn() it is encode already
            parentColumnId: props.columnId,
            // menuItemIds: []
            menuItemIds: props.menuOrdersId.length > 0 ? props.menuOrdersId : []
            // tasksIds: ["task-1", "task-2"]
          }
        },
        // Facilitate reordering of the columns
        columnOrder: ["column-1"]
      },
      nextId:
        Object.keys(this.props.menus).length !== 0 ? Object.keys(this.props.menus).length + 1 : 1
    };
    this.addTaskHandler = this.addTaskHandler.bind(this);
    this.removeListItem = this.removeListItem.bind(this);
    this.updateListItem = this.updateListItem.bind(this);
  }

  componentDidMount() {
    console.log(
      "props.menus items count",
      typeof this.props.menus,
      Object.keys(this.props.menus).length
    );
  }

  // Helper func: Send states of current column to parent component
  sendparentChildStates = state => this.props.childStates(state);
  // add new item to column - calling this method from child
  addTaskHandler(newState) {
    const preparedState = {
      ...this.state.menuInitialData,
      ...newState
    };
    // console.log(preparedState);
    this.setState({
      menuInitialData: preparedState,
      nextId: ++this.state.nextId // eslint-disable-line react/no-direct-mutation-state
    });
    this.sendparentChildStates(preparedState);
  }
  // Update item by ID
  updateListItem(id, listContent) {
    const menusObj = this.state.menuInitialData.tasks;
    const menuCopyById = Object.assign({}, menusObj[id]);
    const newMenuItem = {
      ...menuCopyById,
      name: listContent.name, // update name
      content: listContent.content // update the rest of content
    };
    // preparing new state with merging newMenuItem by its menu id
    const preparedState = {
      ...this.state.menuInitialData,
      tasks: {
        ...this.state.menuInitialData.tasks,
        [id]: newMenuItem
      }
    };
    // saving locally
    this.setState({
      menuInitialData: preparedState
    });
    // sending to provider
    this.sendparentChildStates(preparedState);
  }
  // remove item from column
  removeListItem(id) {
    // this.state.menuColumns.filter((item, index) => item.id !== id)
    console.log(`Menu Item ID = ${id}`);

    // #####  remove taskID from column #####
    const rawTaskids = this.state.menuInitialData.columns["column-1"].menuItemIds;
    // const newTaskids = rawTaskids.splice(rawTaskids.indexOf(id), 1, ...newTaskids);
    const newTaskids = rawTaskids.filter((item, index) => item !== id);
    // console.log(`newTaskids ${JSON.stringify(newTaskids)}`);
    // console.log(`rawTaskids ${JSON.stringify(rawTaskids)}`);
    // console.log(`this.state.menuInitialData.tasks ${JSON.stringify(this.state.menuInitialData.tasks)}`);
    // ##### Remove task single Object from tasks all Object #####
    const tasksObj = this.state.menuInitialData.tasks;
    const filteredTasks = Object.keys(tasksObj)
      .filter(key => newTaskids.includes(key))
      .reduce((obj, key) => {
        obj[key] = tasksObj[key];
        return obj;
      }, {});

    console.log(newTaskids);
    console.log(filteredTasks);

    // finally boom bitch
    const preparedState = {
      ...this.state.menuInitialData,

      tasks: filteredTasks,
      columns: {
        "column-1": {
          ...this.state.menuInitialData.columns["column-1"],
          menuItemIds: newTaskids
        }
      }
    };
    this.setState({
      menuInitialData: preparedState
    });
    this.sendparentChildStates(preparedState);
  }
  // when dragging finishes under the column
  onDragEnd = results => {
    const { destination, source, draggableId } = results;
    // if moved out of droppable container
    if (!destination) return;
    // if moved out and put back to same destination
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;
    // otherwise handle lastely

    const column = this.state.menuInitialData.columns[source.droppableId]; // or can i this.state.menuInitialData.columns['column-1'] bcz we have 1 column only atm
    const newTaskIds = Array.from(column.menuItemIds); // create new tasks id arrrays
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);
    const newColumn = {
      ...column,
      menuItemIds: newTaskIds
    };

    const preparedState = {
      ...this.state.menuInitialData,
      columns: {
        ...this.state.menuInitialData.columns, // we dont need bcz if 1 column
        [newColumn.id]: newColumn
      }
    };
    this.setState({
      menuInitialData: preparedState
    }); // new order

    this.sendparentChildStates(preparedState);
    return;
  };

  render() {
    return (
      <MainContainer>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Container>
            {this.state.menuInitialData.columnOrder.map(columnId => {
              const column = this.state.menuInitialData.columns[columnId];
              const tasks = column.menuItemIds.map(
                taskId => this.state.menuInitialData.tasks[taskId]
              );

              return (
                <Column
                  key={column.id}
                  column={column}
                  namespace={this.props.namespace}
                  tasks={tasks}
                  allTasks={this.state.menuInitialData.tasks}
                  allColumns={this.state.menuInitialData.columns}
                  addTaskHandler={this.addTaskHandler}
                  updateListItem={this.updateListItem}
                  removeListItem={this.removeListItem}
                  columnId={this.props.columnId}
                  removeMenuColumn={this.props.removeMenuColumn}
                  nextId={this.state.nextId}
                />
              );
            })}
          </Container>
        </DragDropContext>
      </MainContainer>
    );
  }
}

export default Menu;
