//
// Imports
//

// Functional
import React from "react";
import axios from "axios";

// Testing
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
} from "@testing-library/react";
import {
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
} from "@testing-library/react";

// Components
import Application from "components/Application";

//
// Testing Code
//
afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    // Arrange
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    // Act
    fireEvent.click(getByText("Tuesday"));

    // Assert
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview, and reduces the spots remaining for the first day by 1", async () => {
    // Arrange
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    // Act
    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    // Assert
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // Arrange/Act
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    // Assert
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview, and increases the spots remaining for the first day by 1", async () => {
    // Arrange
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );

    // Act
    fireEvent.click(getByAltText(appointment, "Delete"));

    // Assert
    expect(
      getByText(
        appointment,
        "Are you sure you want to delete your appointment?"
      )
    ).toBeInTheDocument();

    // Act
    fireEvent.click(getByText(appointment, "Confirm"));

    // Assert
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // Arrange/Act
    await waitForElement(() => getByAltText(appointment, "Add"));

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    // Assert
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // Arrange
    const { container, getByTestId } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );

    // Act
    fireEvent.click(getByAltText(appointment, "Edit"));

    // Assert
    expect(getByTestId("student-name-input")).toHaveValue("Archie Cohen");

    // Act
    fireEvent.change(getByTestId("student-name-input"), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByText(appointment, "Save"));

    // Assert
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // Arrange/Act
    await waitForElement(() => getByText(container, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    // Assert
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    // Arrange
    axios.put.mockRejectedValueOnce();

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    // Act
    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    // Assert
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // Arrange
    await waitForElement(() => getByText(appointment, "Error"));

    // Act
    fireEvent.click(getByAltText(appointment, "Close"));

    // Assert
    expect(
      getByPlaceholderText(appointment, /enter student name/i)
    ).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    // Arrange
    axios.delete.mockRejectedValueOnce();

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );

    // Act
    fireEvent.click(getByAltText(appointment, "Delete"));

    // Assert
    expect(
      getByText(
        appointment,
        "Are you sure you want to delete your appointment?"
      )
    ).toBeInTheDocument();

    // Act
    fireEvent.click(getByText(appointment, "Confirm"));

    // Assert
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // Arange
    await waitForElement(() => getByText(appointment, "Error"));

    // Act
    fireEvent.click(getByAltText(appointment, "Close"));

    // Assert
    expect(getByText(container, "Archie Cohen")).toBeInTheDocument();
  });
});
