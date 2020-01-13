const initialState = {
  selectedListId: 0,
  listUpdated: false,
};

export default {
  state: { ...initialState },
  reducers: {
    selectListItem(state, payload) {
      return {
        ...state,
        selectedListId: payload,
      };
    },

    updateTheList(state) {
      return {
        ...state,
        listUpdated: true,
      };
    },

    listUpdatedFinished(state) {
      return {
        ...state,
        listUpdated: false,
      };
    },
  },
};
