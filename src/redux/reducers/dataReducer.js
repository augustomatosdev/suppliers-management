import { LOADING_DATA, POST_PRODUCT, POST_SUPPLIER } from "../types";

const initialState = {
  products: [],
  suppliers: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };

    case POST_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products],
      };
    case POST_SUPPLIER:
      return {
        ...state,
        suppliers: [action.payload, ...state.suppliers],
      };

    default:
      return state;
  }
}
