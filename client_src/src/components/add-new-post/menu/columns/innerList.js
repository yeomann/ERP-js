import React, { Component } from "react";
import Task from "./Task";

export class InnerList extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.tasks === this.props.tasks) return false;
    return true;
  }
  render() {
    // return JSON.stringify(this.props.tasks)
    return this.props.tasks.map((task, index) => (
      <Task
        key={task.id}
        task={task}
        index={index}
        updateListItem={this.props.updateListItem}
        removeList={this.props.removeList}
      />
    ));
  }
}

export default InnerList;
