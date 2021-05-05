import React from 'react';
import './Footer.scss';

export default function Footer() {
  return (
    <div id="footer" className="row">
      <h5 className="text-center fs-5">tomerGroisman</h5>
      <div className="dropdown-divider"></div>
      <div className="col-6">
        <div className="row">
          <p className="text-end">054-4******</p>
        </div>
        <div className="row">
          <p className="text-end">t***@gmail.com</p>
        </div>
      </div>
      <div className="col-6">
        <div className="row">
          <p><a href="https://github.com/tomergroisman">GitHub</a></p>
        </div>
        <div className="row">
          <p><a href="https://www.linkedin.com/in/tomer-groisman/">LinkedIn</a></p>
        </div>
      </div>
    </div>
  )
}
