//
// Custom Hooks
//

// Imports
import { useState, useEffect } from "react";
import axios from "axios";

// Functions
export default function useApplicationData() {
  // state: refer to and update state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // setDay: specifically target and update the day's state
  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;

      setState((prev) => ({ ...prev, days, appointments, interviewers }));
    });
  }, []);

  // updateSpots: increase or decrease appoointment spots as database and state changes
  const updateSpots = function (state, newAppointments, id) {
    let spots = {
      dayID: 0,
      appointments: [],
      remainingSpots: 0,
    };

    for (let day of state.days) {
      if (day.appointments.includes(id)) {
        spots.appointments = [...day.appointments];
        spots.dayID = day.id;
      }
    }

    spots.appointments.forEach((appointmentID) => {
      if (
        newAppointments[appointmentID] &&
        newAppointments[appointmentID].interview === null
      ) {
        spots.remainingSpots++;
      }
    });

    const updatedDay = {
      ...state.days[spots.dayID - 1],
      spots: spots.remainingSpots,
    };

    const days = [...state.days];
    days[spots.dayID - 1] = updatedDay;

    return days;
  };

  // bookInterview: create a newly filled appointment and update data and state
  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = updateSpots(state, appointments, id);

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState((prev) => ({
        ...prev,
        days,
        appointments,
      }));
    });
  };

  // cancelInterview: remove existing appointment and update data and state
  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = updateSpots(state, appointments, id);

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState((prev) => ({
        ...prev,
        days,
        appointments,
      }));
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
