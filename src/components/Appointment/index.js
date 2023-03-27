import React, { Fragment } from "react";
import "./styles.scss"

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function onSave(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    })
  }

  function onDelete() {
    transition(CONFIRM);
  }

  function onConfirm() {
    transition(DELETE);
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY);
    })
  }

  return (
    <Fragment>
    <Header time={props.time} />
    <article className="appointment">
      {mode === EMPTY && 
        <Empty onAdd={() => transition(CREATE)} />
      }
      {mode === SHOW && (
        <Show student={props.interview.student} interviewer={props.interview.interviewer} onEdit={props.onEdit} onDelete={onDelete} />
      )}
      {mode === CREATE && 
        <Form dailyInterviewers={props.dailyInterviewers} onCancel={back} onSave={onSave}/>  
      }
      {mode === SAVING &&
        <Status message={"Saving"}/>
      }
      {mode === CONFIRM &&
        <Confirm onConfirm={onConfirm} onCancel={back} message={"Are you sure you want to delete your appointment?"}/>
      }
      {mode === DELETE && 
        <Status message={"Deleting"} />
      }
    </article>
    </ Fragment>
  );
};