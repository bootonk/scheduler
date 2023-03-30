// Imports
import React from "react";
import classNames from "classnames";
import "components/Button.scss";

//
// Button Component: Standard functionality tied to styling
// Component Rendered In: Confirm & Form
//
export default function Button(props) {
  const buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger,
  });

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
