import { SEARCH_PRODUCTS, SEARCH_FILTER, SEARCH_ERROR, SEARCH_KEYWORD } from "../types";

const initialState = {
  getSearchFilter: null,
  getSearchData: null,
  getSearchKeywords: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_KEYWORD:
      return { ...state, getSearchKeywords: action.payload, hasError: false };
    case SEARCH_FILTER:
      return { ...state, getSearchFilter: action.payload, hasError: false };
    case SEARCH_PRODUCTS:
      return { ...state, getSearchData: action.payload, hasError: false };
    case SEARCH_ERROR:
      return { ...state, searchError: action.payload, hasError: true };
    default:
      return state;
  }
};
