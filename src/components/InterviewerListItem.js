// Imports
import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

//
// InterviewerListItem Component: Building each interviewer with details for appointments
// Component Parent: InterviewerList
//
export default function InterviewerListItem(props) {
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li onClick={props.setInterviewer} className={interviewerClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && <span>{props.name}</span>}
    </li>
  );
}
