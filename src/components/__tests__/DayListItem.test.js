//
// Imports
//

// Functional
import React from "react";
// Testing
import { render, cleanup } from "@testing-library/react";
// Components
import DayListItem from "components/DayListItem";

//
// Testing Code
//
afterEach(cleanup);

it("renders 'no spots remaining' when there are 0 spots", () => {
  // Arrange
  const { getByText } = render(<DayListItem name="Monday" spots={0} />);

  // Assert
  expect(getByText("no spots remaining")).toBeInTheDocument();
});

it("renders '1 spot remaining' when there is 1 spot", () => {
  // Arrange
  const { getByText } = render(<DayListItem name="Monday" spots={1} />);

  // Assert
  expect(getByText("1 spot remaining")).toBeInTheDocument();
});

it("renders '2 spots remaining' when there are 2 spots", () => {
  // Arrange
  const { getByText } = render(<DayListItem name="Monday" spots={2} />);

  // Assert
  expect(getByText("2 spots remaining")).toBeInTheDocument();
});
