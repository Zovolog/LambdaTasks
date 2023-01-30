import React from "react";
import "./Form.css";

const Form: React.FC = (props) => {
  return (
    <div className="form-wrapper">
      <div className="form-container">
        <input placeholder="Email" />
        <input placeholder="Password" />
        <div className="row-bts">
          <button>sign up</button>
          <button>login</button>
        </div>
      </div>
    </div>
  );
};

export default Form;
