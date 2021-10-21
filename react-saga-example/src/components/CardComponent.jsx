import React from "react";

const Card = (props) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title">{props.user.name}</div>
        <div className="card-subtitle mb-2 text-muted">
          {props.user.company.name}
        </div>
        <div className="card-text">{props.user.company.catchPhrase}</div>
      </div>
    </div>
  );
};

export default Card;
