import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss"

export default function DayListItem(props) {
  const name = props.name;
  const spots = props.spots;
  
  const dayClass = classNames("day-list__item", { 
    "day-list__item--selected": props.selected,  
    "day-list__item--full": (props.spots === 0) 
 });

  const formatSpots = function(spots) {
    if (spots === 0) {
      return "no spots remaining";
    }

    if (spots === 1) {
      return "1 spot remaining";
    }
    
    return `${spots} spots remaining`;
  }

  return (
    <li onClick={() => props.setDay(name)} className={dayClass}>
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}