import React from 'react';
import { ThreeBounce } from 'better-react-spinkit';

import classes from './Preloader.module.css';

const preloader = () => (
  <div className={classes.LoadingContainer}>
    <ThreeBounce color="#2196F3" size={15} />
  </div>
);

export default preloader;