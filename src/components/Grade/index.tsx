import React, { useState, useRef} from 'react';
import Popover from '@material-ui/core/Popover';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import './Grade.scss';

interface Props {
  grade: number,
  idx: number,
  onDelete: (i: number) => void,
  separator?: string
}

export default function Grade(props: Props) {
  const { grade, idx, onDelete, separator } = props;
  const popoverAnchor = useRef(null);
  const [open, setOpen] = useState<boolean>(false);

  // Open the popover
  const handlePopoverOpen = () => {
    setOpen(true);
  };

  // Close the popover
  const handlePopoverClose = () => {
    setOpen(false);
  };

  // Popover click handler
  const handleClick = () => {
    onDelete(idx)
  }

  return (
    <span>
      <span
        ref={popoverAnchor}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {grade + (separator || '')}
      </span>
      <Popover
        onClick={handleClick}
        className="popover"
        classes={{
          paper: "paper",
        }}
        open={open}
        anchorEl={popoverAnchor.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        PaperProps={{onMouseEnter: handlePopoverOpen, onMouseLeave: handlePopoverClose, elevation: 0}}
      >
        <DeleteOutlineIcon className="icon"/>
      </Popover>
    </span>
  )
}
