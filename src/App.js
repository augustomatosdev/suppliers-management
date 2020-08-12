import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import { getAuthUser } from "./redux/actions/userActions";
import { withFirebase } from "./components/Firebase";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import UnAuthRoute from "./utils/UnAuthRoute";
import Signup from "./pages/Signup";
import Contracts from "./pages/Contracts";
import Suppliers from "./pages/Suppliers";
import Products from "./pages/Products";
import NewSupplier from "./pages/NewSupplier";
import NewProduct from "./pages/NewProduct";
import AuthRoute from "./utils/AuthRoute";
import NewContract from "./pages/NewContract";

//MUi Theme settings
const theme = createMuiTheme({
  overrides: {
    MuiListItemText: {
      primary: {
        fontSize: 14,
      },
    },
  },
  palette: {
    primary: {
      light: "#79bcf8",
      main: "#428cc5",
      dark: "#005f94",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#ffff52",
      main: "#ffd600",
      dark: "#c7a500",
      contrastText: "#ffffff",
    },
  },
});

function App(props) {
  useEffect(() => {
    props.firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        store.dispatch({ type: SET_AUTHENTICATED });
        store.dispatch(getAuthUser(props.firebase, user));
      } else {
        console.log("No user");
        // store.dispatch(logoutUser(props.firebase));
      }
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <UnAuthRoute exact path="/" component={Home} />
          <UnAuthRoute exact path="/contracts" component={Contracts} />
          <UnAuthRoute exact path="/contracts/new" component={NewContract} />
          <UnAuthRoute exact path="/suppliers" component={Suppliers} />
          <UnAuthRoute exact path="/products" component={Products} />
          <UnAuthRoute exact path="/products/new" component={NewProduct} />
          <UnAuthRoute exact path="/suppliers/new" component={NewSupplier} />
          <UnAuthRoute exact path="/signup-user" component={Signup} />
          <AuthRoute exact path="/signin" component={Signin} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default withFirebase(App);
