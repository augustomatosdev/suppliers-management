import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllUsers } from "../redux/actions/dataActions";
import { withFirebase } from "../components/Firebase";
import UsersLevel from "../components/UsersLevel";
import { deleteUser } from "../redux/actions/userActions";
import store from "../redux/store";

const Users = (props) => {
  const users = useSelector((state) => state.data.users);
  const admin = useSelector((state) => state.user.credentials);
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
                <th>Acção</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                let userCred = {
                  email: user.email,
                  password: user.password,
                  userId: user.userId,
                };
                const adminCred = {
                  email: admin.email,
                  password: admin.password,
                };

                return (
                  <tr key={user.userId}>
                    <td>{user.displayName}</td>
                    <td>{user.job}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>Nivel {user.permission}</td>
                    <td>
                      <span
                        style={{ cursor: "pointer" }}
                        className="icon is-small has-text-danger"
                        onClick={() => {
                          store.dispatch(
                            deleteUser(props.firebase, adminCred, userCred)
                          );
                        }}
                      >
                        <i className="fas fa-lg fa-trash"></i>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default withFirebase(Users);
