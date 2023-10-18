//local mutation
import { createSlice } from "@reduxjs/toolkit";
// import { sub } from "date-fns";
const initialState = {
  tools: [],
};

const toolsSlice = createSlice({
  name: "tools",
  initialState,
  reducers: {
    toolAdded: {
      reducer(state, action) {
        state.tools.push(action.payload);
      },
      prepare({
        tool_name,
        textToRemove,
        textToInsert,
        label,
        _id,
        textToCopy,
      }) {
        return {
          payload: {
            tool_name,
            textToRemove,
            textToInsert,

            label,
            _id,
            textToCopy,
          },
        };
      },
    },
    toolsFetched: (state, action) => {
      // Update the state with the posts received from the server
      state.foods = action.payload;
    },

    toolEditted: (state, action) => {
      const { textToCopy, textToRemove, textToInsert, label, _id } =
        action.payload;
      const existingTool = state.tools.find((tool) => tool._id === _id);

      if (existingTool) {
        existingTool.textToRemove = textToRemove;
        existingTool.textToInsert = textToInsert;
        existingTool.label = label;
        existingTool.textToCopy = textToCopy;
        existingTool._id = _id;
      }
    },
    removeTool: (state, action) => {
      const { _id } = action.payload;
      const tool = state.tools.filter((tool) => tool._id !== _id);

      if (tool) {
        state.tools = tool;
      }
    },
  },
});

export const { toolAdded, toolsFetched, removeTool, toolEditted } =
  toolsSlice.actions;

export default toolsSlice.reducer;
