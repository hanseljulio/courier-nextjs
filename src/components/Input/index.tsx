import React from "react";
import styles from "./Input.module.css";

interface InputProps {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  width?: string;
  styling?: string;
  onChange?: (e: any) => void;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  pattern?: string;
}

function Input(props: InputProps) {
  return (
    <div className="input-div">
      <div
        className={`flex-col input-div-wrapper ${
          props.styling ? props.styling : ""
        }`}
      >
        <p className="pb-[8px] text-lg font-bold ">{props.label}</p>
        <input
          className={`${styles.inputArea} ${props.width ? props.width : ""}`}
          type={props.type}
          name={props.name}
          placeholder={props.placeholder ? props.placeholder : ""}
          value={props.value}
          onChange={props.onChange}
          disabled={props.disabled ? true : false}
          required={!props.required ? false : true}
          pattern={props.pattern}
        />
      </div>
    </div>
  );
}

export default Input;