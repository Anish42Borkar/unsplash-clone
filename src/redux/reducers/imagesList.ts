import { createSlice } from "@reduxjs/toolkit";

export interface ImageListState {
  id: string;
  urls: string;
}

const initialState: ImageListState = {
  id: "",
  urls: "",
};

export const counterSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setImages: (state) => {
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setImages } = counterSlice.actions;

export default counterSlice.reducer;
