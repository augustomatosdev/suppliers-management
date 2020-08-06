import React from "react";
import { useSelector } from "react-redux";

const DashInfo = () => {
  //   const schoolData = useSelector((state) => state.data.school);
  return (
    <>
      <div className="columns is-multiline">
        <div className="column">
          <div className="box notification is-success">
            <div className="heading">Orçamento</div>
            <div className="title">AOA 20.000</div>
            <div className="level">
              <div className="level-item">
                <div>
                  <a className="heading has-text-weight-bold">Ver todos</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="box notification is-warning">
            <div className="heading">Contratos</div>
            <div className="title">35</div>
            <div className="level">
              <div className="level-item">
                <div>
                  <a className="heading has-text-weight-bold">Ver todos</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="box notification is-link">
            <div className="heading">Fornecedores</div>
            <div className="title">20</div>
            <div className="level">
              <div className="level-item">
                <div>
                  <a className="heading has-text-weight-bold">Ver todos</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashInfo;
