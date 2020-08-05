import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ,
  SET_UPLOAD_FILE,
} from "../types";
import { config } from "../../components/Firebase/config";
import store from "../store";
import { v4 as uuidv4 } from "uuid";
