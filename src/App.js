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
import Suppliers from "./pages/Suppliers";
import Products from "./pages/Products";
import NewSupplier from "./pages/NewSupplier";
import NewProduct from "./pages/NewProduct";
import AuthRoute from "./utils/AuthRoute";
import NewProcedure from "./pages/NewProcedure";
import Contracts from "./pages/Contracts";
import Contract from "./pages/Contract";
import NewContract from "./pages/NewContract";
import EditContract from "./pages/EditContract";

import Agreements from "./pages/Agreements";
import Agreement from "./pages/Agreement";
import NewAgreement from "./pages/NewAgreement";
import EditAgreement from "./pages/EditAgreement";

import Supplier from "./pages/Supplier";
import Procedures from "./pages/Procedures";
import Procedure from "./pages/Procedure";
import EditSupplier from "./pages/EditSupplier";
import EditProcedure from "./pages/EditProcedure";
import Users from "./pages/Users";
import FinancialYear from "./pages/FinancialYear";

//MUi Theme settings
const theme = createMuiTheme({
  overrides: {
    MuiListItemText: {
      primary: {
        fontSize: 14,
      },
    },
    MUIDataTableBodyCell: {
      root: {
        maxWidth: 400,
      },
    },
  },
  palette: {
    primary: {
      light: "#f48c06",
      main: "#faa307",
      dark: "#f48c06",
      contrastText: "#000000",
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
          <UnAuthRoute
            exact
            path="/financial/:month"
            component={FinancialYear}
          />
          <UnAuthRoute exact path="/contracts" component={Contracts} />
          <UnAuthRoute exact path="/contracts/new" component={NewContract} />
          <UnAuthRoute
            exact
            path="/contracts/:contractId"
            component={Contract}
          />
          <UnAuthRoute
            exact
            path="/contracts/edit/:contractId"
            component={EditContract}
          />
          <UnAuthRoute exact path="/agreements" component={Agreements} />
          <UnAuthRoute exact path="/agreements/new" component={NewAgreement} />
          <UnAuthRoute
            exact
            path="/agreements/:agreementId"
            component={Agreement}
          />
          <UnAuthRoute
            exact
            path="/agreements/edit/:agreementId"
            component={EditAgreement}
          />
          <UnAuthRoute exact path="/suppliers" component={Suppliers} />
          <UnAuthRoute exact path="/suppliers/new" component={NewSupplier} />
          <UnAuthRoute
            exact
            path="/suppliers/:supplierId"
            component={Supplier}
          />
          <UnAuthRoute
            exact
            path="/suppliers/edit/:supplierId"
            component={EditSupplier}
          />
          <UnAuthRoute exact path="/products" component={Products} />
          <UnAuthRoute exact path="/products/new" component={NewProduct} />
          <UnAuthRoute exact path="/procedures" component={Procedures} />
          <UnAuthRoute exact path="/procedures/new" component={NewProcedure} />
          <UnAuthRoute
            exact
            path="/procedures/:procedureId"
            component={Procedure}
          />
          <UnAuthRoute
            exact
            path="/procedures/edit/:procedureId"
            component={EditProcedure}
          />
          <UnAuthRoute exact path="/users" component={Users} />
          <UnAuthRoute exact path="/users/new" component={Signup} />
          <AuthRoute exact path="/signin" component={Signin} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default withFirebase(App);
