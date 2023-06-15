import React from "react";

export const Tasklist = (props) => {
    console.log(props.taskName,'p1')
  return (
    <>
      <ul>
        <li>
          {props.taskName}
          <button onClick={() => props.deleteTask(props.id)}>Remove</button>
        </li>
      </ul>
    </>
  );
};
