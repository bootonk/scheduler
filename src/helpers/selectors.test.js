//
// Imports
//
import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from "helpers/selectors";

//
//Testing Data
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
test("getAppointmentsForDay returns an array", () => {
  // Arrange
  const result = getAppointmentsForDay(state, "Monday");

  // Assert
  expect(Array.isArray(result)).toBe(true);
});

test("getAppointmentsForDay returns an array with a length matching the number of appointments for that day", () => {
  // Arrange
  const result = getAppointmentsForDay(state, "Monday");

  // Assert
  expect(result.length).toEqual(3);
});

test("getAppointmentsForDay returns an array containing the correct appointment objects", () => {
  // Arrange
  const [first, second] = getAppointmentsForDay(state, "Tuesday");

  // Assert
  expect(first).toEqual(state.appointments["4"]);
  expect(second).toEqual(state.appointments["5"]);
});

test("getAppointmentsForDay returns an empty array when the days data is empty", () => {
  // Arrange
  const result = getAppointmentsForDay({ days: [] }, "Monday");

  // Assert
  expect(result.length).toEqual(0);
});

test("getAppointmentsForDay returns an empty array when the day is not found", () => {
  // Arrange
  const result = getAppointmentsForDay(state, "Wednesday");

  // Assert
  expect(result.length).toEqual(0);
});

test("getInterviewersForDay returns an array", () => {
  // Arrange
  const result = getInterviewersForDay(state, "Monday");

  // Assert
  expect(Array.isArray(result)).toBe(true);
});

test("getInterviewersForDay returns an array with a length matching the number of interviewers for that day", () => {
  // Arrange
  const result = getInterviewersForDay(state, "Monday");

  // Assert
  expect(result.length).toEqual(2);
});

test("getInterviewersForDay returns an array containing the correct interviewer objects", () => {
  // Arrange
  const [first, second] = getInterviewersForDay(state, "Tuesday");

  // Assert
  expect(first).toEqual(state.interviewers["1"]);
  expect(second).toEqual(state.interviewers["2"]);
});

test("getInterviewersForDay returns an empty array when the days data is empty", () => {
  // Arrange
  const result = getInterviewersForDay({ days: [] }, "Monday");

  // Assert
  expect(result.length).toEqual(0);
});

test("getInterviewersForDay returns an empty array when the day is not found", () => {
  // Arrange
  const result = getInterviewersForDay(state, "Wednesday");

  // Assert
  expect(result.length).toEqual(0);
});

test("getInterview returns an object with the interviewer data", () => {
  // Arrange
  const result = getInterview(state, state.appointments["3"].interview);

  // Assert
  expect(result).toEqual(
    expect.objectContaining({
      student: expect.any(String),
      interviewer: expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        avatar: expect.any(String),
      }),
    })
  );
});

test("getInterview returns null if no interview is booked", () => {
  // Arrange
  const result = getInterview(state, state.appointments["2"].interview);

  // Assert
  expect(result).toBeNull();
});
