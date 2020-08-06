import React, { useState } from "react";
import SignupForm from "../components/SignupForm";
import store from "../redux/store";
import { signupUser } from "../redux/actions/userActions";
import { withFirebase } from "../components/Firebase";

const Signup = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    displayName: "",
    job: "",
    permission: "",
    errors: {},
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUserData = state;
    delete newUserData.errors;
    store.dispatch(signupUser(newUserData, props.firebase, props.history));
  };

  return (
    <>
      <div className="columns is-centered">
        <div className="column is-4">
          <SignupForm
            state={state}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
        <div className="column is-4">
          <div className="section">
            <h1 className="title has-text-centered">Informações</h1>
            <div class="content">
              <ol type="1">
                <li>
                  Para cadastrar um novo usuário preencha atenciosamente o
                  formulário com os dados solicitados.
                </li>
                <li>
                  O email cadastrado para cada usuário deve ser real por ser o
                  método de recuperação em caso de esquecimento da Senha de
                  acesso.
                </li>
                <li>
                  O nível de permissão define quais módulos podem ser acessados
                  por cada usuário. "Usuário Nível 1" pode realizar todas as
                  operações de consultas e escrituras à base de dados, pode
                  também cadastrar novos usuários. "Usuário Nível 2" pode
                  realizar operações de consultas à base de dados.
                </li>
                <li>
                  A senha deve conter no mínimo 6 caracteres entre letras e
                  números.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withFirebase(Signup);
