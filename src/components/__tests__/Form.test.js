//
// Imports
//

// Functional
import React from "react";
// Testing
import { render, cleanup, fireEvent } from "@testing-library/react";
// Components
import Form from "components/Appointment/Form";

//
// Testing Code
//
afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
  ];

  it("renders without student name if not provided", () => {
    // Arrange
    const { getByPlaceholderText } = render(
      <Form dailyInterviewers={interviewers} />
    );

    // Assert
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    // Arrange
    const { getByTestId } = render(
      <Form dailyInterviewers={interviewers} student="Lydia Miller-Jones" />
    );

    // Assert
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    // Arrange
    const onSave = jest.fn();

    const { getByText } = render(
      <Form dailyInterviewers={interviewers} onSave={onSave} />
    );

    // Act
    fireEvent.click(getByText("Save"));

    // Assert
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("validates that the interviewer cannot be null", () => {
    // Arrange
    const onSave = jest.fn();

    const { getByText } = render(
      <Form
        dailyInterviewers={interviewers}
        onSave={onSave}
        student="Lydia Miller-Jones"
      />
    );

    // Act
    fireEvent.click(getByText("Save"));

    // Assert
    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("can successfully save after trying to submit an empty student name", () => {
    // Arrange
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form dailyInterviewers={interviewers} onSave={onSave} interviewer={1} />
    );

    // Act
    fireEvent.click(getByText("Save"));

    // Assert
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();

    // Act
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByText("Save"));

    // Assert
    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });

  it("calls onCancel and resets the input field", () => {
    // Arrange
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        dailyInterviewers={interviewers}
        name="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );

    // Act
    fireEvent.click(getByText("Save"));

    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByText("Cancel"));

    // Assert
    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
