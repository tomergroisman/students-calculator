import React from 'react';
import Fade from '@material-ui/core/Fade';
import {Grades, GradesHighlights} from '../../utils/types';
import Grade from '../Grade';

interface Props {
  grades: Grades,
  gradesHighlights: GradesHighlights | null,
  onDeleteGrade: (i: number) => void
}

export default function GradesWidget(props: Props) {
  const { grades, gradesHighlights, onDeleteGrade } = props;
  const renderGrades = () => (
    grades.map((grade, i) => 
        <Grade 
          key={`${grade}-${i}`}
          onDelete={onDeleteGrade}
          grade={grade}
          idx={i}
          separator={i !== grades.length - 1 ? ', ' : ''}
        />
    )
  );

  if (gradesHighlights) {
    return (
      <Fade in={!!gradesHighlights} timeout={1000}>
        <div>
          <div className="row">
            <div className="col-6">
              <h1 className="text-center display-4">Average</h1>
              <p className="text-center fs-2">{gradesHighlights.avg}</p>
            </div>
            <div className="col-6">
              <h1 className="text-center display-4">Highest</h1>
              <p className="text-center fs-2">{gradesHighlights.highest}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <h1 className="text-center display-4">Lowest</h1>
              <p className="text-center fs-2">{gradesHighlights.lowest}</p>
            </div>
            <div className="col-6">
              <h1 className="text-center display-4"># Failures</h1>
              <p className="text-center fs-2">{gradesHighlights.failures}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <p className="text-center fs-2">{renderGrades()}</p>
            </div>
          </div>
        </div>
      </Fade>
    )
  }
  return null;
}
