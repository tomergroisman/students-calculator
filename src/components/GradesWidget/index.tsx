import React from 'react';
import {GradesHighlights} from '../../utils/types';

interface Props {
  gradesHighlights: GradesHighlights | null,
}

export default function GradesWidget(props: Props) {
  if (props.gradesHighlights) {
  return (
    <div>
      <div className="row">
        <div className="col-6">
          <h1 className="text-center display-4">Average</h1>
          <p className="text-center fs-2">{props.gradesHighlights.avg}</p>
        </div>
        <div className="col-6">
          <h1 className="text-center display-4">Highest</h1>
          <p className="text-center fs-2">{props.gradesHighlights.highest}</p>
        </div>
      </div>
        <div className="row">
          <div className="col-6">
            <h1 className="text-center display-4">Lowest</h1>
            <p className="text-center fs-2">{props.gradesHighlights.lowest}</p>
          </div>
          <div className="col-6">
            <h1 className="text-center display-4"># Failures</h1>
            <p className="text-center fs-2">{props.gradesHighlights.failures}</p>
          </div>
        </div>
    </div>
  )}
  return null;
}
