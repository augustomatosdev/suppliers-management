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
  SET_BILLS,
  SET_SUPPLIER,
  SET_DOCUMENTS,
  POST_PROCEDURE,
  SET_PROCEDURES,
  SET_PROCEDURE,
  SET_LEGISLATIONS,
  SET_USERS,
  STOP_LOADING_DATA,
} from "../types";

const initialState = {
  users: [],
  legislations: [],
  procedures: [],
  supplier: {},
  procedure: {},
  contract: {},
  products: [],
  documents: [],
  bills: [],
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
    case STOP_LOADING_DATA:
      return {
        ...state,
        loading: false,
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
        loading: false,
      };
    case SET_BILLS:
      return {
        ...state,
        bills: action.payload,
        loading: false,
      };
    case SET_SUPPLIER:
      return {
        ...state,
        supplier: action.payload,
        loading: false,
      };
    case SET_DOCUMENTS:
      return {
        ...state,
        documents: action.payload,
        loading: false,
      };
    case SET_PROCEDURES:
      return {
        ...state,
        procedures: action.payload,
        loading: false,
      };
    case POST_PROCEDURE:
      return {
        ...state,
        procedures: [action.payload, ...state.procedures],
      };
    case SET_PROCEDURE:
      return {
        ...state,
        procedure: action.payload,
        loading: false,
      };
    case SET_LEGISLATIONS:
      return {
        ...state,
        legislations: action.payload,
        loading: false,
      };
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
