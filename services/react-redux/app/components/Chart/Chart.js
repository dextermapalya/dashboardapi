import React, { useState } from 'react';

import PropTypes from 'prop-types';
import {
  Collapse, Button
} from 'reactstrap';

const Chart = ({ component, index, data }) => {
  const ComponentToRender = component;
  const [arrowDirection, setArrowDirection] = useState(true);
  const upArrow = 'fa-chevron-up uparrow';
  const downArrow = 'fa-chevron-down downarrow';
  const PointerIcon = arrowDirection ? upArrow : downArrow;

  const toggle = (e) => {
    e.preventDefault();
    setArrowDirection(arrowDirection => !arrowDirection);
  };

  return (
    <div className="col-lg-6">
    <div className="ibox float-e-margins">
      <div className="ibox-title">
        <h5 className="Individual_title">{data.title} Hourly</h5>
        <div className="ibox-tools">
          <a className="collapse-link">
            <Button id="chart-{index}" className={`fa ${PointerIcon}`} onClick={toggle} />
          </a>

          <ul className="dropdown-menu dropdown-user">
            <li>
              <a href="#">Config option 1</a>
            </li>
            <li>
              <a href="#">Config option 2</a>
            </li>
          </ul>
        </div>
      </div>
      <Collapse isOpen={arrowDirection}>

        <div className="ibox-content">
          <ComponentToRender />
        </div>

      </Collapse>
    </div>
  </div>

  );
};

Chart.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default Chart;
