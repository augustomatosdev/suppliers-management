import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import Loading from "./Loading";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Departamento da Contratação Pública do Governo Provincial Cuanza Sul
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SigninForm({
  state,
  handleChange,
  handleSubmit,
  loading,
}) {
  const classes = useStyles();
  const errors = useSelector((state) => state.UI.errors);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <figure className="image is-128x128">
          <img style={{ maxHeight: "100%" }} src={Logo} />
        </figure>
        <h1 className="title has-text-centered is-marginless has-text-weight-bold has-text-danger">
          GOV.CS.UCP
        </h1>

        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
            value={state.email}
            error={errors.email && true}
            helperText={errors.email}
          />
          <TextField
            required
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            value={state.password}
          />
          <p className="has-text-danger is-size-7">
            {errors.general && errors.general}
          </p>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            color="primary"
            className={classes.submit}
          >
            {" "}
            {loading ? <Loading /> : "Entrar"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Esqueceu-se dos dados de acesso?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
