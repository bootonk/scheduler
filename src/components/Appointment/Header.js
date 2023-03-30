// Imports
import React from "react";

//
// Header Component: Show appointment time as a divider between spots
// Component Parent: Appointment
//
export default function Header(props) {
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__separator" />
    </header>
  );
}
