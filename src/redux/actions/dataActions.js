import {
  POST_PRODUCT,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  POST_SUPPLIER,
  SET_SUPPLIERS,
  SET_SUPPLIER,
  SET_DOCUMENTS,
  SET_LEGISLATIONS,
  LOADING_USER,
  LOADING_DATA,
  SET_USERS,
  STOP_LOADING_DATA,
  STOP_LOADING_UI,
} from "../types";

export const getAllUsers = (firebase) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  firebase.db
    .collection("users")
    .orderBy("displayName", "asc")
    .get()
    .then((data) => {
      let users = [];
      data.forEach((doc) => {
        users.push({
          ...doc.data(),
        });
      });
      dispatch({
        type: SET_USERS,
        payload: users,
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

// ***************Products and services actions********************
export const postProduct_Service = (firebase, newProduct) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  firebase.db
    .collection("products_or_services")
    .add(newProduct)
    .then((doc) => {
      const resProduct = newProduct;
      resProduct.productId = doc.id;
      dispatch({
        type: POST_PRODUCT,
        payload: resProduct,
      });
      dispatch(clearErrors());
      alert("Produto cadastrado com sucesso");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

//********************SUPPLIERS ACTIONS *******************/
export const postSupplier = (firebase, newSupplier, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  firebase.db
    .collection("suppliers")
    .add(newSupplier)
    .then((doc) => {
      const resSupplier = newSupplier;
      resSupplier.supplierId = doc.id;
      dispatch({
        type: POST_SUPPLIER,
        payload: resSupplier,
      });
      dispatch(clearErrors());
      alert("Fornecedor cadastrado com sucesso");
      history.push(`/suppliers`);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err,
      });
    });
};

export const getAllSuppliers = (firebase) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  firebase.db
    .collection("suppliers")
    .orderBy("name", "asc")
    .get()
    .then((data) => {
      let suppliers = [];
      data.forEach((doc) => {
        suppliers.push({
          ...doc.data(),
          supplierId: doc.id,
        });
      });
      dispatch({
        type: SET_SUPPLIERS,
        payload: suppliers,
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

export const getSupplier = (firebase, supplierId, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  firebase.db
    .doc(`/suppliers/${supplierId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        alert("Este fornecedor nao existe ou deve ter sido apagado!");
        return history.push("/suppliers");
      }
      dispatch({
        type: SET_SUPPLIER,
        payload: { ...doc.data(), supplierId: doc.id },
      });
      dispatch({
        type: STOP_LOADING_UI,
      });
    })
    .catch((err) => {
      console.log(err);
      alert("Ocorreu um erro desconhecido, tente novamente");
      history.push("/contracts");
    });
};

export const getSupplierDocuments = (firebase, supplierId, history) => (
  dispatch
) => {
  dispatch({ type: LOADING_DATA });

  firebase.db
    .collection("documents")
    .where("supplierId", "==", supplierId)
    .orderBy("date", "desc")
    .get()
    .then((data) => {
      let documents = [];
      data.forEach((doc) => {
        documents.push({
          ...doc.data(),
          documentId: doc.id,
        });
      });
      dispatch({
        type: SET_DOCUMENTS,
        payload: documents,
      });
    })
    .catch((err) => {
      console.log(err);
      alert("Ocorreu um erro desconhecido, tente novamente");
      history.push(`/suppliers/${supplierId}`);
    });
};

export const getLegislations = (firebase) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  firebase.db
    .collection("legislations")
    .orderBy("date", "desc")
    .get()
    .then((data) => {
      let legislations = [];
      data.forEach((doc) => {
        legislations.push({
          ...doc.data(),
          legislationId: doc.id,
        });
      });
      dispatch({
        type: SET_LEGISLATIONS,
        payload: legislations,
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

export const deleteLegislation = (firebase, legislationId) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  const document = firebase.db.doc(`/legislations/${legislationId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return alert("Este documento já foi eliminado!");
      } else {
        return document.delete();
      }
    })
    .then(() => {
      alert("Documento eliminado com sucesso!");
      return dispatch(getLegislations(firebase));
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err,
      });
    });
};

export const deleteSupplier = (firebase, supplierId, history) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  const document = firebase.db.doc(`/suppliers/${supplierId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return alert("Este fornecedor já foi eliminado!");
      } else {
        return document.delete();
      }
    })
    .then(() => {
      alert("Documento eliminado com sucesso!");
      dispatch(getAllSuppliers(firebase));
      history.push("/suppliers");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err,
      });
    });
};
export const updateSupplier = (firebase, supplierId, history, supplierData) => (
  dispatch
) => {
  dispatch({ type: LOADING_DATA });
  firebase.db
    .doc(`/suppliers/${supplierId}`)
    .update(supplierData)
    .then(() => {
      alert("Actualização feita com sucesso!");
      history.push(`/suppliers/${supplierId}`);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err,
      });
    });
};

export const deleteDocument = (firebase, documentId, supplierId, history) => (
  dispatch
) => {
  dispatch({ type: LOADING_DATA });
  const document = firebase.db.doc(`/documents/${documentId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return alert("Este documento já foi eliminado!");
      } else {
        return document.delete();
      }
    })
    .then(() => {
      alert("Documento eliminado com sucesso!");
      dispatch(getSupplierDocuments(firebase, supplierId, history));
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err,
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
