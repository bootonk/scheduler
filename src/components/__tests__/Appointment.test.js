//
// Imports
//

// Functional
import React from "react";
// Testing
import { render, cleanup } from "@testing-library/react";
// Components
import Appointment from "components/Appointment";

//
// Testing Data
//
const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: [1, 2],
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [1, 2],
    },
  ],
  appointments: {
    1: { id: 1, time: "12pm", interview: null },
    2: { id: 2, time: "1pm", interview: null },
    3: {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 },
    },
    4: { id: 4, time: "3pm", interview: null },
    5: {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 },
    },
  },
  interviewers: {
    1: {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
    2: {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png",
    },
  },
};

//
// Testing Code
//
afterEach(cleanup);

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(
      <Appointment
        key={1}
        id={1}
        time="4pm"
        interview={{ student: "Lydia Miller-Jones", interviewer: "Bob" }}
        dailyInterviewers={() => {}}
        bookInterview={() => {}}
        cancelInterview={() => {}}
      />
    );
  });
});
