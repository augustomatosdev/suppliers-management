import React from "react";
import { Link } from "react-router-dom";

const AgreementsLevel = () => {
  return (
    <nav className="level is-mobile">
      <div className="level-left">
        <div className="level-item">
          <p className="subtitle is-5">
            <Link
              to="/agreements/new"
              type="submit"
              className="button is-small is-warning"
            >
              <span className="icon is-small">
                <i className="fas fa-plus"></i>
              </span>
              <span>Novo</span>
            </Link>
          </p>
        </div>
      </div>

      <div className="level-right"></div>
    </nav>
  );
};

export default AgreementsLevel;
