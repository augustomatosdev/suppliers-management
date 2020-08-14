import React from "react";
import { Link } from "react-router-dom";

const ProceduresLevel = () => {
  return (
    <nav className="level is-mobile">
      <div className="level-left">
        <div className="level-item">
          <p className="subtitle is-5">
            <Link
              to="/procedures/new"
              type="submit"
              className="button is-small is-link"
            >
              <span className="icon is-small">
                <i className="fas fa-plus"></i>
              </span>
              <span>Novo</span>
            </Link>
          </p>
        </div>
      </div>

      <div className="level-right">
        <p className="level-item">
          <a>Published</a>
        </p>
        <p className="level-item">
          <a>Drafts</a>
        </p>
        <p className="level-item">
          <a>Deleted</a>
        </p>
      </div>
    </nav>
  );
};

export default ProceduresLevel;
