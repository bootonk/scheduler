//
// Helper Functions
//

// Populate each day with available appointments based on updating database and state
export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter((singleDay) => singleDay.name === day);

  let appointmentsForDay = [];
  if (filteredDays.length > 0) {
    appointmentsForDay = filteredDays[0].appointments;
  } else {
    return appointmentsForDay;
  }

  let appointmentsArray = [];
  for (const appointmentID of appointmentsForDay) {
    if (state.appointments[appointmentID]) {
      appointmentsArray.push(state.appointments[appointmentID]);
    }
  }

  return appointmentsArray;
}

// Populate each day with available interviewers based on updating database and state
export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter((singleDay) => singleDay.name === day);

  let interviewersForDay = [];
  if (filteredDays.length > 0) {
    interviewersForDay = filteredDays[0].interviewers;
  } else {
    return interviewersForDay;
  }

  let interviewersArray = [];
  for (const interviewerID of interviewersForDay) {
    if (state.interviewers[interviewerID]) {
      interviewersArray.push(state.interviewers[interviewerID]);
    }
  }

  return interviewersArray;
}

// Populate interview details based on updating database and state
export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }

  const interviewerID = interview.interviewer;
  const detailedInterview = {
    student: interview.student,
    interviewer: state.interviewers[interviewerID],
  };

  return detailedInterview;
}
