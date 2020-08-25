import {
  SET_ERRORS,
  LOADING_DATA,
  SET_FINANCIALS,
  SET_FINANCIALYEARS,
} from "../types";

export const getAllFinancials = (firebase) => (dispatch) => {
  dispatch({ type: LOADING_DATA });

  firebase.db
    .collection("financials")
    .get()
    .then((data) => {
      let financials = [];
      data.forEach((doc) => {
        financials.push({
          ...doc.data(),
          financialId: doc.id,
        });
      });
      dispatch({
        type: SET_FINANCIALS,
        payload: financials,
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

export const getFinancialYears = (firebase) => (dispatch) => {
  dispatch({ type: LOADING_DATA });

  firebase.db
    .collection("financialYear")
    .get()
    .then((data) => {
      let financialYears = [];
      data.forEach((doc) => {
        financialYears.push({
          ...doc.data(),
          financialYearId: doc.id,
        });
      });
      dispatch({
        type: SET_FINANCIALYEARS,
        payload: financialYears,
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
