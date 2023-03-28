import React, { Fragment } from "react";
import "./styles.scss"

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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
    .catch(() => {
      transition(ERROR_SAVE, true);
    })
  }

  function onConfirm() {
    transition(DELETE, true);
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY);
    })
    .catch(() => {
      transition(ERROR_DELETE, true);
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
        <Show student={props.interview.student} interviewer={props.interview.interviewer} onEdit={() => transition(EDIT)} onDelete={() => transition(CONFIRM)} />
      )}
      {mode === CREATE && 
        <Form dailyInterviewers={props.dailyInterviewers} onCancel={back} onSave={onSave}/>  
      }
      {mode === EDIT &&
        <Form student={props.interview.student} interviewer={props.interview.interviewer.id} dailyInterviewers={props.dailyInterviewers} onCancel={back} onSave={onSave}/>
      }
      {mode === SAVING &&
        <Status message={"Saving"}/>
      }
      {mode === ERROR_SAVE &&
        <Error message={"Error saving appointment"} onClose={back} />
      }
      {mode === CONFIRM &&
        <Confirm onConfirm={onConfirm} onCancel={back} message={"Are you sure you want to delete your appointment?"}/>
      }
      {mode === DELETE && 
        <Status message={"Deleting"} />
      }
      {mode === ERROR_DELETE &&
        <Error message={"Error deleting appointment"} onClose={back} />
      }
    </article>
    </ Fragment>
  );
};