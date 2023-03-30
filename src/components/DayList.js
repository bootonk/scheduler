// Imports
import React from "react";
import DayListItem from "components/DayListItem";

//
// DayList Component: Displaying the list of appointment days in left sidebar
// Component Parent: Application
//
export default function DayList(props) {
  const days = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={props.onChange}
      />
    );
  });

  return <ul>{days}</ul>;
}
