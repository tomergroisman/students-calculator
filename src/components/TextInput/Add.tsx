import React, { useCallback, useState, useEffect } from 'react';
import { TextField, IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { clearText } from './index';

interface Props {
  label: string,
  onChange?: (value: string) => void,
  onAddClick?: (newGrades: string) => void,
  inputRef?: (ref: HTMLInputElement) => void
  nextInput?: HTMLInputElement,
  validationRules?: { [key: string]: {validator: (...args: any[]) => boolean, text: string}}
}

export default function Add(props: Props) {
  const { label, onAddClick, onChange, inputRef, nextInput, validationRules } = props;
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [continuesValidation, setContinuesValidation] = useState<boolean>(false);

  // onChange handler
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(evt.target.value);
    nextInput?.focus();
    setText(evt.target.value);
  }

  // Invoke onAddClick and clear the displayed text
  const handleClick = () => {
    if (!validate()) {
      setContinuesValidation(true)
      return;
    }
    onAddClick && onAddClick(text);
    clearText(setText);
    setContinuesValidation(false)
  }

  // Reset component state
  const reset = () => {
    setText("")
    setError("");
    setContinuesValidation(false);
  }

  // Validate the input
  const validate = useCallback(() => {
    for (const rule in validationRules) {
      if (!validationRules[rule].validator(text)) {
        setError(validationRules[rule].text);
        return false;
      }
    }
    setError("");
    return true;
  }, [validationRules, text])

  useEffect(() => {
    continuesValidation && validate();
  }, [text, continuesValidation, validate])

  return (
    <div className="root d-flex align-items-center justify-content-between">
      <TextField
        inputRef={(ref: HTMLInputElement) => inputRef && inputRef(ref)}
        label={label}
        fullWidth
        onKeyDown={(evt: React.KeyboardEvent) => evt.key === "Enter" && handleClick()}
        onChange={handleChange}
        className="me-1"
        value={text}
        error={!!error}
        helperText={error}
        onBlur={reset}
      />
      <IconButton
        className="action-icon ms-1"
        onClick={handleClick}
        size="small"
      >
        <AddCircleIcon />
      </IconButton>
    </div>
  )
}
