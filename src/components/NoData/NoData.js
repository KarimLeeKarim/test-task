import React from "react";
import groupListCss from "./NoData.module.css";

export const NoData = () => {
  return (
    <ul className={groupListCss.nodata}>
      <p>No data</p>
    </ul>
  );
};
