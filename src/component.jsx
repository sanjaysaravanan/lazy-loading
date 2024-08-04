import React from "react";


const HomeIcon = (props) => {
  return <svg {...props}>
    <circle cx={props.height} cy={props.width} r={'100'} stroke="black" stroke-width="3" fill="red" />
    Sorry, your browser does not support inline SVG.
  </svg>;
}

export default HomeIcon;
