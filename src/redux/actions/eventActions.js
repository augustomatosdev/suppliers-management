import {
  POST_EVENT,
  LOADING_UI,
  SET_ERRORS,
  LOADING_DATA,
  SET_EVENTS,
  DELETE_EVENT,
} from "../types";
import { clearErrors } from "./dataActions";

export const postEvent = (firebase, newEvent) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  firebase.db
    .collection("events")
    .add(newEvent)
    .then((doc) => {
      const resEvent = newEvent;
      resEvent.eventId = doc.id;
      dispatch({
        type: POST_EVENT,
        payload: resEvent,
      });
      alert("Evento criado com sucesso!");
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getEvents = (firebase) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  firebase.db
    .collection("events")
    .get()
    .then((data) => {
      let events = [];
      data.forEach((doc) => {
        events.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      dispatch({
        type: SET_EVENTS,
        payload: events,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_EVENTS,
        payload: [],
      });
    });
};

export const updateEvent = (firebase, eventData, eventId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  firebase.db
    .doc(`/event/${eventId}`)
    .update(eventData)
    .then(() => {
      dispatch(getEvents());
      alert("Actualização feita com sucesso!");
    })
    .catch((err) => console.log(err));
};

export const deleteEvent = (firebase, eventId) => (dispatch) => {
  const document = firebase.db.doc(`/events/${eventId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return console.log("Evento nao encontrado");
      }
      return document.delete();
    })
    .then(() => {
      dispatch({ type: DELETE_EVENT, payload: eventId });
      alert("Evento deletado com sucesso!");
      dispatch(getEvents());
    })
    .catch((err) => console.log(err));
};
