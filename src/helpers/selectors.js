export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(singleDay => singleDay.name === day);
  
  let appointmentsForDay = [];
  if (filteredDays.length > 0) {
    appointmentsForDay = filteredDays[0].appointments;
  } else {
    return appointmentsForDay;
  }

  let appointmentsArray = [];
  for (const appointmentID of appointmentsForDay) {
    if (state.appointments[appointmentID]) {
      appointmentsArray.push(state.appointments[appointmentID])
    }
  }

  return appointmentsArray;
};