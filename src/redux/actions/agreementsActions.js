import {
  SET_ERRORS,
  SET_CONTRACTS,
  LOADING_DATA,
  SET_CONTRACT,
  SET_BILLS,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_AGREEMENT,
  SET_AGREEMENTS,
} from "../types";

export const getAllAgreements = (firebase) => (dispatch) => {
  dispatch({ type: LOADING_DATA });

  firebase.db
    .collection("agreements")
    .orderBy("date", "desc")
    .get()
    .then((data) => {
      let agreements = [];
      data.forEach((doc) => {
        agreements.push({
          ...doc.data(),
          agreementId: doc.id,
        });
      });
      dispatch({
        type: SET_AGREEMENTS,
        payload: agreements,
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

export const getAgreement = (firebase, agreementId, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  firebase.db
    .doc(`/agreements/${agreementId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        alert("Este acordo-quadro nao existe ou deve ter sido apagado!");
        return history.push("/agreements");
      }
      dispatch({
        type: SET_AGREEMENT,
        payload: { ...doc.data(), agreementId: doc.id },
      });
      dispatch({
        type: STOP_LOADING_UI,
      });
    })
    .catch((err) => {
      console.log(err);
      alert("Ocorreu um erro desconhecido, tente novamente");
      history.push("/agreements");
    });
};

export const getAgreementBills = (firebase, agreementId, history) => (
  dispatch
) => {
  dispatch({ type: LOADING_DATA });

  firebase.db
    .collection("bills")
    .where("agreementId", "==", agreementId)
    .orderBy("date", "desc")
    .get()
    .then((data) => {
      let bills = [];
      data.forEach((doc) => {
        bills.push({
          ...doc.data(),
          billId: doc.id,
        });
      });
      dispatch({
        type: SET_BILLS,
        payload: bills,
      });
    })
    .catch((err) => {
      console.log(err);
      alert("Ocorreu um erro desconhecido, tente novamente");
      history.push(`/agreements/${agreementId}`);
    });
};

export const deleteAgreement = (firebase, agreementId, history) => (
  dispatch
) => {
  dispatch({ type: LOADING_DATA });
  const document = firebase.db.doc(`/agreements/${agreementId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return alert("Este contrato já foi eliminado!");
      } else {
        return document.delete();
      }
    })
    .then(() => {
      alert("Documento eliminado com sucesso!");
      dispatch(getAllAgreements(firebase));
      history.push("/agreements");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err,
      });
    });
};

export const updateAgreement = (
  firebase,
  agreementId,
  history,
  agreementData
) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  firebase.db
    .doc(`/agreements/${agreementId}`)
    .update(agreementData)
    .then(() => {
      alert("Actualização feita com sucesso!");
      history.push(`/agreements/${agreementId}`);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err,
      });
    });
};
