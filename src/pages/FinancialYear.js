import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import FinancialModal from "../components/modals/Financial";
import { withFirebase } from "../components/Firebase";
import store from "../redux/store";
import { LOADING_DATA } from "../redux/types";
import {
  getFinancialYears,
  getAllFinancials,
} from "../redux/actions/financialsActions";
import { useSelector } from "react-redux";

const FinancialYear = (props) => {
  const financialYears = useSelector((state) => state.data.financialYears);
  const selectedMonth = props.match.params.month;
  const [filters, setFilter] = useState({
    year: new Date().getFullYear().toString(),
    month: "january",
  });
  const [state, setState] = useState({
    modal: false,
    description: "",
    selectedFile: null,
    year: "",
    month: "",
    loaded: 0,
  });

  const financials = useSelector((state) => state.data.financials).filter(
    (data) =>
      // if (!state.search) return data;
      // else if (
      data.year === filters.year && data.month === filters.month
    // ) {
    //   return data;
    // }
  );

  useEffect(() => {
    setFilter({
      ...filters,
      month: selectedMonth,
    });
  }, [selectedMonth]);

  const onYearChange = (e) => {
    setFilter({
      ...filters,
      year: e.target.value,
    });
  };

  useEffect(() => {
    store.dispatch(getFinancialYears(props.firebase));
    store.dispatch(getAllFinancials(props.firebase));
  }, []);
  const openModal = () => {
    setState({ ...state, modal: true });
  };
  const closeModal = () => {
    setState({
      modal: false,
      description: "",
      selectedFile: null,
      year: "",
      month: "",
      loaded: 0,
    });
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleFile = (e) => {
    setState({
      ...state,
      selectedFile: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    store.dispatch({ type: LOADING_DATA });

    const file = state.selectedFile;

    const imageExtension = file.name.split(".")[
      file.name.split(".").length - 1
    ];
    const imageFileName = `${Math.round(
      Math.random() * 1000000000000
    ).toString()}.${imageExtension}`;

    var metadata = {
      contentType: "application/pdf",
    };
    const uploadTask = props.firebase.storage
      .ref(`/financials/${imageFileName}`)
      .put(file, metadata);
    uploadTask.on(
      props.firebase.storageBase.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setState({ ...state, loaded: progress });
      },
      (err) => {
        console.log(err);
      },
      () => {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then((downloadURL) => {
            const newDocument = {
              description: state.description,
              year: state.year,
              month: state.month,
              link: downloadURL,
            };
            return props.firebase.db.collection("financials").add(newDocument);
          })
          .then((doc) => {
            return props.firebase.db
              .collection("financialYear")
              .where("year", "==", state.year)
              .limit(1)
              .get();
          })
          .then((data) => {
            if (data.empty) {
              return props.firebase.db
                .collection("financialYear")
                .add({ year: state.year });
            } else {
              return console.log("Ano ja existe");
            }
          })
          .then(() => {
            alert(`Documento #${state.description} adicionado com sucesso!`);
            closeModal();
            store.dispatch(getFinancialYears(props.firebase));
            store.dispatch(getAllFinancials(props.firebase));
          });
      }
    );
  };

  return (
    <>
      <FinancialModal
        handleChange={handleChange}
        handleFile={handleFile}
        state={state}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
      />
      <div className="columns is-centered">
        <div className="column is-8">
          <nav className="panel">
            <p className="panel-heading">Execução Financeira </p>
            <div className="control has-icons-left">
              <div className="select is-small">
                <select
                  name="year"
                  onChange={onYearChange}
                  value={filters.year}
                >
                  <option value="">Exercício</option>
                  {financialYears.length > 0 &&
                    financialYears.map((finYear) => (
                      <option
                        key={finYear.financialYearId}
                        value={finYear.year}
                      >
                        {finYear.year}
                      </option>
                    ))}
                </select>
              </div>
              <span className="icon is-small is-left">
                <i className="fas fa-globe"></i>
              </span>
            </div>
            {/* <div className="panel-block">
              <p className="control has-icons-left">
                <input className="input" type="text" placeholder="Search" />
                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true"></i>
                </span>
              </p>
            </div> */}
            <p className="panel-tabs">
              <NavLink activeClassName="is-active" to="/financial/january">
                Janeiro
              </NavLink>
              <NavLink activeClassName="is-active" to="/financial/february">
                Fevereiro
              </NavLink>
              <NavLink activeClassName="is-active" to="/financial/march">
                Março
              </NavLink>
              <NavLink activeClassName="is-active" to="/financial/april">
                Abril
              </NavLink>
              <NavLink activeClassName="is-active" to="/financial/may">
                Maio
              </NavLink>
              <NavLink activeClassName="is-active" to="/financial/june">
                Junho
              </NavLink>
              <NavLink activeClassName="is-active" to="/financial/july">
                Julho
              </NavLink>
              <NavLink activeClassName="is-active" to="/financial/august">
                Agosto
              </NavLink>
              <NavLink activeClassName="is-active" to="/financial/september">
                Setembro
              </NavLink>
              <NavLink activeClassName="is-active" to="/financial/october">
                Outubro
              </NavLink>
              <NavLink activeClassName="is-active" to="/financial/november">
                Novembro
              </NavLink>
              <NavLink activeClassName="is-active" to="/financial/december">
                Dezembro
              </NavLink>
            </p>
            {financials.length > 0 ? (
              financials.map((financial) => (
                <a
                  key={financial.financialId}
                  href={financial.link}
                  target="_blank"
                  className="panel-block is-active"
                >
                  <span className="panel-icon">
                    <i className="fas fa-book" aria-hidden="true"></i>
                  </span>
                  {financial.description}
                </a>
              ))
            ) : (
              <h1>
                &nbsp; &nbsp;A pesquisa não encontrou documentos para este mês
              </h1>
            )}
            <div className="panel-block">
              <button
                onClick={openModal}
                className="button is-link is-outlined is-fullwidth"
              >
                Adicionar documento
              </button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default withFirebase(FinancialYear);
