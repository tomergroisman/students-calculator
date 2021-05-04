import React, { useState, useEffect, useRef } from 'react';
import { TextField, IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import { debounce, DebouncedFunc } from 'lodash';


interface Props {
  label: string,
  addButton?: boolean,
  deleteButton?: boolean,
  onChange?: (value: string) => void,
  onClick?: (newGrades: string) => void,
  clearTimeout?: boolean,
  inputRef?: (ref: HTMLInputElement) => void
  nextInput?: HTMLInputElement
}

export default function TextInput(props: Props) {
  const { label, addButton, deleteButton, onClick, onChange, clearTimeout, inputRef, nextInput } = props;
  const [text, setText] = useState<string>("");
  const [showDeleteBtn, setShowDeleteBtn] = useState<boolean>(false);
  const debouncedClearText = useRef<DebouncedFunc<() => void> | null>(null)

  // onChange handler
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(evt.target.value);
    setShowDeleteBtn(false);
    setText(evt.target.value);
  }

  // Invoke onClick and clear the displayed text
  const handleClick = () => {
    onClick && onClick(text);
    setShowDeleteBtn(false);
    setText("");
  }

  // Clear the displayed text
  const clearText = () => setText("");

  // componentDidMount
  useEffect(() => {
    debouncedClearText.current = debounce(() => {
      clearText();
      nextInput?.focus();
      deleteButton && setShowDeleteBtn(true);
    }, 2500);
  }, [deleteButton, nextInput])

  // Invoke debounced clear text
  useEffect(() => {
    if (clearTimeout && !!text) {
      debouncedClearText.current && debouncedClearText.current()
    }
  }, [text, clearTimeout, debouncedClearText, nextInput])

  return (
    <div className="root d-flex align-items-center justify-content-between">
      <TextField
        inputRef={(ref: HTMLInputElement) => inputRef && inputRef(ref)}
        label={label}
        fullWidth
        onChange={handleChange}
        className={addButton ? "me-1" : ""}
        value={text}
      />
      {(addButton) &&
        <IconButton
          className="ms-1"
          onClick={handleClick}
          size="small"
        >
          <AddCircleIcon />
        </IconButton>}
      {showDeleteBtn &&
        <IconButton
          className="ms-1"
          onClick={handleClick}
          size="small"
        >
          <DeleteIcon />
        </IconButton>}
    </div>
  )
}
