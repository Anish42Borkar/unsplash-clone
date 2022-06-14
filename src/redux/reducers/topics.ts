import { createSlice } from "@reduxjs/toolkit";

export interface TopicsListState {
  list: any[];
}

const initialState: TopicsListState = {
  list: [],
};

export const topicsList = createSlice({
  name: "topics",
  initialState,
  reducers: {
    setTopicList: (state, action): any => {
      state.list = action.payload;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTopicList } = topicsList.actions;
export const getTopicsList = (state: any) => state.topics.list;
export default topicsList.reducer;
