import List from "@/modules/lists/entities/List";
import ListMember from "@/modules/lists/entities/ListMembers";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface State {
  activeList: List | null;
  lists: List[];
  listMembers: ListMember[];
}

// Define the initial state using that type
const initialState: State = {
  activeList: null,
  lists: [],
  listMembers: [],
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setListMembers: (state, action: PayloadAction<ListMember[]>) => {
      state.listMembers = action.payload;
    },
    setLists: (state, action: PayloadAction<List[]>) => {
      state.lists = action.payload;
    },
    setActiveList: (state, action: PayloadAction<List | null>) => {
      state.activeList = action.payload;
    },
  },
  selectors: {
    selectActiveList: (state) => state.activeList,
    selectLists: (state) => state.lists,
    selectListMembers: (state) => state.listMembers,
  },
});

export const { setActiveList, setListMembers, setLists } = listSlice.actions;

export const { selectActiveList, selectLists, selectListMembers } =
  listSlice.selectors;

export default listSlice.reducer;
