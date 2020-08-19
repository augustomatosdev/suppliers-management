import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllUsers } from "../redux/actions/dataActions";
import { withFirebase } from "../components/Firebase";
import UsersLevel from "../components/UsersLevel";

const Users = (props) => {
  const users = useSelector((state) => state.data.users);
  useEffect(() => {
    getAllUsers(props.firebase);
  }, []);
  return (
    <>
      <UsersLevel />
      <div className="columns is-centered">
        <div className="column is-8">
          <h1 className="title has-text-centered">
            Utilizadores cadastrados no sistema
          </h1>
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Função</th>
                <th>Email</th>
                <th>Senha</th>
                <th>Permissão</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.userId}>
                  <td>{user.displayName}</td>
                  <td>{user.job}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>Nivel {user.permission}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default withFirebase(Users);
