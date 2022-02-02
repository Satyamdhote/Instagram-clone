import React from "react";
import "./Videos.css";
import ReactDOM from "react-dom";

export default function Videos(props) {
  const handleClick = (e) => {
    e.preventDefault();
    e.target.muted = !e.target.muted;
  };
  const handleScroll = (e) => {
    let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
    if (next) {
      next.scrollIntoView();
      e.target.muted = true;
    }
  };
  return (
    <video
      src={props.src}
      onEnded={handleScroll}
      className="videos-styling"
      id={props.id}
      onClick={handleClick}
      muted="muted"
    ></video>
  );
}
