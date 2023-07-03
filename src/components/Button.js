import React from "react";

const DigitButton = ({ dispatch, value }) => {
  const sendValue = (event) => {
    switch (event) {
      case "AC":
        dispatch({
          type: "CLEAR"
        });

        break;

      case "DEL":
        dispatch({
          type: "DELETE_DIGIT"
        });
        break;

      case "+":
        dispatch({
          type: "SELECT_OPERATION",
          payload: event
        });

        break;
      case "-":
        dispatch({
          type: "SELECT_OPERATION",
          payload: event
        });

        break;
      case "÷":
        dispatch({
          type: "SELECT_OPERATION",
          payload: event
        });

        break;
      case "*":
        dispatch({
          type: "SELECT_OPERATION",
          payload: event
        });
        break;
      case "=":
        dispatch({
          type: "EQUAL"
        });
        break;
      default:
        dispatch({
          type: "ADD_DIGIT",
          payload: event
        });
    }
  };
  const size = value === "=" || value === "AC" ? "span-two" : null;
  return (
    <button
      className={`${size}`}
      value={value}
      onClick={(event) => sendValue(event.target.value)}
    >
      {value}
    </button>
  );
};
export default DigitButton;
