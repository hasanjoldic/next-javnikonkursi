import React from "react";

import classnames from "./linear-progress.module.css";

export default function LinearProgress() {
  return (
    <div className={classnames.linearProgress}>
      <div className={classnames.linearProgressBar}></div>
    </div>
  );
};
