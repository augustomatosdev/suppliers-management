import {
  SET_ERRORS,
  SET_CONTRACTS,
  LOADING_DATA,
  SET_CONTRACT,
} from "../types";

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

export const getContract = (firebase, contractId, history) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  firebase.db
    .doc(`/contracts/${contractId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        alert("Este contrato nao existe ou deve ter sido apagado!");
        return history.push("/contracts");
      }
      dispatch({
        type: SET_CONTRACT,
        payload: { ...doc.data(), contractId: doc.id },
      });
    })
    .catch((err) => {
      console.log(err);
      alert("Ocorreu um erro desconhecido, tente novamente");
      history.push("/contracts");
    });
};
