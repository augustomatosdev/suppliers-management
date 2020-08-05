import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import UnAuthRoute from "./utils/UnAuthRoute";

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <UnAuthRoute exact path="/" component={Home} />
          <Route exact path="/signin" component={Signin} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
