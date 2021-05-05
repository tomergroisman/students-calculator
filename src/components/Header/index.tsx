import React, { useState, useEffect } from 'react';
import { Collapse } from '@material-ui/core';

interface Props {
  name: string,
}

export default function Header(props: Props) {
  const { name } = props;
  const [display, setDisplay] = useState<string>(name);

  // Set display name on prop.name change
  useEffect(() => {
    setTimeout(() => {
      setDisplay(name)
    }, !!name ? 0 : 400)
  }, [name])

  return (
    <div>
      <h1 className="display-1 text-center mt-3">Student Calculator</h1>
      <Collapse in={!!name}>
        <h3 className="display-4 text-center">{`👋  Hi ${display}`}</h3>
      </Collapse>
    </div>
  )
}
