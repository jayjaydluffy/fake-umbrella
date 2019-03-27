import React from 'react';
import { ThreeBounce } from 'better-react-spinkit';

import classes from './Preloader.module.css';

const disabledLoading = () => (
  <div className={classes.DisabledLoader}>
    <ThreeBounce color="#2196F3" size={15} />
  </div>
);

export default disabledLoading;