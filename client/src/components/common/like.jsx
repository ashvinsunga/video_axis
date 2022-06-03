import React, { Component } from "react";

const Like = ({ liked, onClick }) => {
  let classes = "fa fa-star";
  if (!liked) classes += "-o";
  return (
    <i
      onClick={onClick}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
