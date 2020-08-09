import {
  POST_PRODUCT,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  POST_SUPPLIER,
  SET_SUPPLIERS,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ,
  SET_UPLOAD_FILE,
  LOADING_DATA,
} from "../types";

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

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
