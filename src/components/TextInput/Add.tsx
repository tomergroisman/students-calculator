import React, { useState } from 'react';
import { TextField, IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { clearText } from './index';

interface Props {
  label: string,
  onChange?: (value: string) => void,
  onAddClick?: (newGrades: string) => void,
  inputRef?: (ref: HTMLInputElement) => void
  nextInput?: HTMLInputElement
}

export default function Add(props: Props) {
  const { label, onAddClick, onChange, inputRef, nextInput } = props;
  const [text, setText] = useState<string>("");

  // onChange handler
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(evt.target.value);
    nextInput?.focus();
    setText(evt.target.value);
  }

  // Invoke onAddClick and clear the displayed text
  const handleClick = () => {
    onAddClick && onAddClick(text);
    clearText(setText);
  }

  return (
    <div className="root d-flex align-items-center justify-content-between">
      <TextField
        inputRef={(ref: HTMLInputElement) => inputRef && inputRef(ref)}
        label={label}
        fullWidth
        onChange={handleChange}
        className="me-1"
        value={text}
      />
      <IconButton
        className="ms-1"
        onClick={handleClick}
        size="small"
      >
        <AddCircleIcon />
      </IconButton>
    </div>
  )
}
