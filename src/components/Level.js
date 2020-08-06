import React from "react";
import { Link } from "react-router-dom";

const Level = () => {
  return (
    <nav class="level is-mobile">
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5">
            <Link
              to="/suppliers/new"
              type="submit"
              class="button is-small is-link"
            >
              <span class="icon is-small">
                <i class="fas fa-plus"></i>
              </span>
              <span>Novo</span>
            </Link>
          </p>
        </div>
      </div>

      <div class="level-right">
        <p class="level-item">
          <a>Published</a>
        </p>
        <p class="level-item">
          <a>Drafts</a>
        </p>
        <p class="level-item">
          <a>Deleted</a>
        </p>
      </div>
    </nav>
  );
};

export default Level;
