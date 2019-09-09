import { Reducer } from "react-native-router-flux";

const reducerCreate = params => {
  const defaultReducer = Reducer(params);
  return (state, action) => {
    console.log(action.type);
    console.log(action.type === "BODGE");
    if (action.type === "BODGE") {
      if (state.children.length > 1) {
        state = Object.assign({}, state, {
          index: 0,
          children: state.children.slice(0, 1)
        });
      }
    } else {
      state = defaultReducer(state, action);
    }
    return state;
  };
};

export default reducerCreate;
