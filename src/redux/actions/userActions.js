import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ,
  SET_USERS,
  LOADING_DATA,
} from "../types";
import { validateSignupData, validateLoginData } from "../../utils/validators";
import { config } from "../../components/Firebase/config";
import store from "../store";

export const signupUser = (newUserData, firebase, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  firebase.auth
    .createUserWithEmailAndPassword(newUserData.email, newUserData.password)
    .then((data) => {
      return data.user.uid;
    })
    .then((userId) => {
      const userCredentials = {
        displayName: newUserData.displayName,
        email: newUserData.email,
        createdAt: new Date().toISOString(),
        userId,
        job: newUserData.job,
        permission: newUserData.permission,
        password: newUserData.password,
      };
      return firebase.db.collection("/users").add(userCredentials);
    })
    .then((data) => {
      alert("Novo usuario cadastrado com sucesso!");
      history.push("/");
    })
    .catch((err) => {
      if (err.code === "auth/email-already-in-use") {
        return store.dispatch({
          type: SET_ERRORS,
          payload: { email: "Este email ja foi cadastrado!" },
        });
      } else {
        console.log(err);
        return store.dispatch({
          type: SET_ERRORS,
          payload: { general: "Ocorreu um erro, tente novamente" },
        });
      }
    });
};

export const loginUser = (user, history, firebase) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  const { valid, errors } = validateLoginData(user);

  if (!valid) store.dispatch({ type: SET_ERRORS, payload: errors });

  firebase.auth
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      setAuthorization(token);
      // dispatch(getUserData())
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: { general: "Email ou senha errados, tente novamente!" },
      });
    });
};

//GET AUTHENTICATED USER
export const getAuthUser = (firebase, user) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  let userData = {};

  if (user) {
    firebase.db
      .collection("users")
      .where("userId", "==", user.uid)
      .limit(1)
      .get()
      .then((data) => {
        userData.credentials = data.docs[0].data();
        return firebase.db
          .collection("likes")
          .where("userId", "==", user.uid)
          .get();
      })
      .then((data) => {
        dispatch({
          type: SET_USER,
          payload: userData,
        });
      })
      .catch((err) => console.log(err));
  } else {
    console.log("No user");
  }
};

export const logoutUser = (firebase) => (dispatch) => {
  firebase.auth
    .signOut()
    .then(() => {
      dispatch({ type: SET_UNAUTHENTICATED });
      // window.location.href = "/signin";
    })
    .catch((err) => console.log(err));
};

const setAuthorization = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
};
