import { createSlice } from "@reduxjs/toolkit";
import checkIfIdExist from "../../utility/checkIfIdExist";

export interface ImageListState {
  list: any[];
  counter: number;
}

const initialState: ImageListState = {
  list: [],
  counter: 0,
};

export const wishList = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    setWishList: (state, action) => {
      if (!checkIfIdExist(state.list, action.payload.id)) {
        state.list.push(action.payload);
        state.counter = state.list.length;
        return state;
      }
      return state;
    },
    removeFromWishList: (state, action) => {
      const filteredWishList = state.list.filter(
        (item: any) => item.id !== action.payload
      );
      state.list = filteredWishList;
      state.counter = state.list.length;

      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setWishList, removeFromWishList } = wishList.actions;
export const getWishListData = (state: any) => state.wishList;
export default wishList.reducer;
