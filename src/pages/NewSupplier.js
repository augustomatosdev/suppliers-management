import React from "react";
import Level from "../components/Level";
import NewSuppForm from "../components/NewSuppForm";

const NewSupplier = () => {
  return (
    <div>
      <Level />
      <div className="columns is-centered">
        <div className="column is-6">
          <NewSuppForm />
        </div>
      </div>
    </div>
  );
};

export default NewSupplier;
