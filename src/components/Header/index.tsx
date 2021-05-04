import React from 'react';
import Collapse from '@material-ui/core/Collapse';

interface Props {
  name: string,
}

export default function Header(props: Props) {
  const { name } = props;
  return (
    <div>
      <h1 className="display-1 text-center">Student Calculator</h1>
      <Collapse in={!!name}>
        <h3 className="display-4 text-center">{ name && `👋  Hi ` }</h3>
      </Collapse>
    </div>
  )
}
