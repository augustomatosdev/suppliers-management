import {
  LOADING_DATA,
  POST_PRODUCT,
  POST_SUPPLIER,
  SET_SUPPLIERS,
  POST_EVENT,
  SET_EVENTS,
  DELETE_EVENT,
  SET_CONTRACTS,
  SET_CONTRACT,
} from "../types";

const initialState = {
  contract: {},
  products: [],
  suppliers: [],
  events: [],
  contracts: [],
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
    case SET_SUPPLIERS:
      return {
        ...state,
        suppliers: action.payload,
        loading: false,
      };
    //*************Events reducers***************************
    case POST_EVENT:
      return {
        ...state,
        events: [action.payload, ...state.events],
      };

    case SET_EVENTS:
      return {
        ...state,
        events: action.payload,
      };
    case DELETE_EVENT:
      let index = state.events.findIndex(
        (event) => event.id === action.payload
      );
      state.events.splice(index, 1);
      return {
        ...state,
      };

    //*************Contracts reducers **********/
    case SET_CONTRACTS:
      return {
        ...state,
        contracts: action.payload,
        loading: false,
      };
    case SET_CONTRACT:
      return {
        ...state,
        contract: action.payload,
      };

    default:
      return state;
  }
}
