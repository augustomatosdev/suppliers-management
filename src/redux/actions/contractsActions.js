import { SET_ERRORS, SET_CONTRACTS, LOADING_DATA } from "../types";

export const getAllContracts = (firebase) => (dispatch) => {
  dispatch({ type: LOADING_DATA });

  firebase.db
    .collection("contracts")
    .orderBy("date", "desc")
    .get()
    .then((data) => {
      let contracts = [];
      data.forEach((doc) => {
        contracts.push({
          ...doc.data(),
          contractId: doc.id,
        });
      });
      dispatch({
        type: SET_CONTRACTS,
        payload: contracts,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err,
      });
    });
};
