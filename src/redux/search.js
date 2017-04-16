const TYPE = {
  ADDBOOKS: 'ADDBOOKS',
  SET_SEARCH_ITEM: 'SET_SEARCH_ITEM',
};

export const setBooks = books => ({
  type: TYPE.ADDBOOKS,
  books
});

export const setSearchItem = item => ({
  type: TYPE.SET_SEARCH_ITEM,
  item
});

const initialState = {
  books: [],
  item: {
    mods: {
      abstract: {
        $: 'default mod text'
      }
    }
  }
};

export default (_state = initialState, action = {}) => {
  const state = { ..._state };
  switch (action.type) {
    case TYPE.ADDBOOKS:
      return {
        ...state,
        books: action.books
      };
    case TYPE.SET_SEARCH_ITEM:
      return {
        ...state,
        item: action.item
      };
    default:
      return state;
  }
};
