//
// Imports
//

// Testing
import { renderHook, act } from "@testing-library/react-hooks";
// Functions
import useVisualMode from "hooks/useVisualMode";

//
// Testing Data
//
const FIRST = "FIRST";
const SECOND = "SECOND";
const THIRD = "THIRD";

//
// Testing Code
//
test("useVisualMode should initialize with default value", () => {
  // Arrange
  const { result } = renderHook(() => useVisualMode(FIRST));

  // Assert
  expect(result.current.mode).toBe(FIRST);
});

test("useVisualMode should transition to another mode", () => {
  // Arrange
  const { result } = renderHook(() => useVisualMode(FIRST));

  // Act
  act(() => result.current.transition(SECOND));

  // Assert
  expect(result.current.mode).toBe(SECOND);
});

test("useVisualMode should return to previous mode", () => {
  // Arrange
  const { result } = renderHook(() => useVisualMode(FIRST));

  // Act & Assert
  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);

  act(() => result.current.transition(THIRD));
  expect(result.current.mode).toBe(THIRD);

  act(() => result.current.back());
  expect(result.current.mode).toBe(SECOND);

  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
});

test("useVisualMode should not return to previous mode if already at initial", () => {
  // Arrange
  const { result } = renderHook(() => useVisualMode(FIRST));

  // Act
  act(() => result.current.back());

  // Assert
  expect(result.current.mode).toBe(FIRST);
});

test("useVisualMode should replace the current mode", () => {
  // Arrange
  const { result } = renderHook(() => useVisualMode(FIRST));

  // Act & Assert
  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);

  act(() => result.current.transition(THIRD, true));
  expect(result.current.mode).toBe(THIRD);

  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
});
