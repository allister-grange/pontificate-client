import { useState } from "react";

type InputHookRes = {
  value: string;
  hasError: boolean;
  valueChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputBlurHandler: () => void;
};

const useInput = (validateValue: (value: string) => boolean): InputHookRes => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  return {
    value: enteredValue,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
  };
};

export default useInput;
