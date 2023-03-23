import React, { Fragment } from "react";
import "./styles.scss"

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
  return (
    <Fragment>
    <Header time={props.time} />
    <article className="appointment">
      {props.interview 
        ? <Show student={props.interview.student} interviewer={props.interview.interviewer} onEdit={props.onEdit} onDelete={props.onDelete} /> 
        : <Empty />}
    </article>
    </ Fragment>
  );
};