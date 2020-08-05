import { LOADING_DATA, SET_UPLOAD_FILE } from "../types";
import { size } from "lodash";

const initialState = {
  screams: [],
  scream: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
}
