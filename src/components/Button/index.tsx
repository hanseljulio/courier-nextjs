import React from "react";

interface ButtonProps {
  text: string;
  styling?: string;
  onClick?: () => void;
}

function Button(props: ButtonProps) {
  return (
    <div className="btn-div">
      <button
        className={`${props.styling ? props.styling : ""}`}
        onClick={props.onClick}
      >
        {props.text}
      </button>
    </div>
  );
}

export default Button;
