const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Menu Name 1" },
    "task-2": { id: "task-2", content: "Menu Name 2" },
    "task-3": { id: "task-3", content: "Menu Name 3" },
    "task-4": { id: "task-4", content: "Menu Name 4" }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Menu category here",
      tasksIds: ["task-1", "task-2", "task-3", "task-4"]
    }
  },
  // Facilitate reordering of the columns
  columnOrder: ["column-1"]
};

export default initialData;
