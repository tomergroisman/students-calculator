import React, { useState, useEffect, useMemo } from 'react';
import { TextField, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { debounce, DebouncedFunc } from 'lodash';
import { clearText } from './index';

interface Props {
  label: string,
  onChange?: (value: string) => void,
  onDeleteClick?: (newGrades: string) => void,
  clearTimeout?: number,
  inputRef?: (ref: HTMLInputElement) => void
  nextInput?: HTMLInputElement
}
export default function Delete(props: Props) {
  const { label, onDeleteClick, onChange, clearTimeout, inputRef, nextInput } = props;
  const [text, setText] = useState<string>("");
  const [showDeleteBtn, setShowDeleteBtn] = useState<boolean>(false);

  // onChange handler
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(evt.target.value);
    setShowDeleteBtn(false);
    setText(evt.target.value);
  }

  // Invoke onDeleteClick and clear the displayed text
  const handleClick = () => {
    onDeleteClick && onDeleteClick(text);
    setShowDeleteBtn(false);
    setText("");
  }

  const debouncedClearText = useMemo<DebouncedFunc<() => void>>(() => 
    debounce(() => {
      clearText(setText);
      nextInput?.focus();
      setShowDeleteBtn(true);
    }, clearTimeout), [clearTimeout, nextInput]);

  // Invoke debounced clear text
  useEffect(() => {
    if (clearTimeout && !!text) {
      debouncedClearText();
    }
    else {
      debouncedClearText.cancel()
    }
  }, [text, clearTimeout, debouncedClearText, nextInput])

  return (
    <div className="root d-flex align-items-center justify-content-between">
      <TextField
        inputRef={(ref: HTMLInputElement) => inputRef && inputRef(ref)}
        label={label}
        fullWidth
        onChange={handleChange}
        className={showDeleteBtn ? "me-1" : ""}
        value={text}
      />
      {showDeleteBtn &&
        <IconButton
          className="action-icon ms-1"
          onClick={handleClick}
          size="small"
        >
          <DeleteIcon />
        </IconButton>}
    </div>
  )
}
