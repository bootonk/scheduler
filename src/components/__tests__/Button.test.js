//
// Imports
//

// Functional
import React from "react";
// Testing
import { render, cleanup, fireEvent } from "@testing-library/react";
// Components
import Button from "components/Button";

//
// Testing Code
//
afterEach(cleanup);

it("renders its `children` prop as text", () => {
  // Arrange
  const { getByText } = render(<Button>Default</Button>);

  // Assert
  expect(getByText("Default")).toBeInTheDocument();
});

it("renders a default button style", () => {
  // Arrange
  const { getByText } = render(<Button>Default</Button>);

  // Assert
  expect(getByText("Default")).toHaveClass("button");
});

it("renders a confirm button", () => {
  // Arrange
  const { getByText } = render(<Button confirm>Confirm</Button>);

  // Assert
  expect(getByText("Confirm")).toHaveClass("button--confirm");
});

it("renders a danger button", () => {
  // Arrange
  const { getByText } = render(<Button danger>Danger</Button>);

  // Assert
  expect(getByText("Danger")).toHaveClass("button--danger");
});

it("renders a clickable button", () => {
  // Arrange
  const handleClick = jest.fn();
  const { getByText } = render(
    <Button onClick={handleClick}>Clickable</Button>
  );

  const button = getByText("Clickable");

  // Act
  fireEvent.click(button);

  // Assert
  expect(handleClick).toHaveBeenCalledTimes(1);
});

it("renders a disabled button", () => {
  // Arrange
  const handleClick = jest.fn();
  const { getByText } = render(
    <Button disabled onClick={handleClick}>
      Disabled
    </Button>
  );

  const button = getByText("Disabled");

  // Act
  fireEvent.click(button);

  // Assert
  expect(handleClick).toHaveBeenCalledTimes(0);
});
