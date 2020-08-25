import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Logo from "../assets/logo.png";
import { useSelector } from "react-redux";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Departamento Provincial de Contratação Pública do Cuanza Sul
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function SignupForm({ state, handleChange, handleSubmit }) {
  const classes = useStyles();
  const errors = useSelector((state) => state.UI.errors);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <figure className="image is-64x64">
          <img style={{ maxHeight: "100%" }} src={Logo} />
        </figure>
        <h1 className="subtitle has-text-centered is-size-7 is-marginless">
          DEPARTAMENTO DE CONTRATAÇÃO PÚBLICA DO GOVERNO PROVINCIAL DO CUANZA
          SUL
        </h1>

        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="displayName"
            label="Nome completo"
            name="displayName"
            autoComplete="displayName"
            autoFocus
            onChange={handleChange}
            value={state.displayName}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="job"
            label="Cargo/Função"
            name="job"
            autoComplete="job"
            onChange={handleChange}
            value={state.job}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
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
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Permissão</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="permission"
              name="permission"
              onChange={handleChange}
              fullWidth
              value={state.permission}
            >
              <MenuItem value={1}>Nivel 1</MenuItem>
              <MenuItem value={2}>Nivel 2</MenuItem>
              <MenuItem value={3}>Nivel 3</MenuItem>
            </Select>
          </FormControl>
          <p className="has-text-danger is-size-7">
            {errors.general && errors.general}
          </p>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Cadastrar
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
