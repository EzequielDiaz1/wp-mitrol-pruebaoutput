import React, { useState } from "react";
import ExpandedWidget from "../ExpandedWidget/ExpandedWidget";
import config from "../../config.json";
import "./WidgetButton.css";

const WidgetButton = () => {
  const [expanded, setExpanded] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(config.icon_notExpanded);

  const toggleWidget = () => {
    setExpanded(!expanded);
    setCurrentIcon(expanded ? config.icon_notExpanded : config.icon_expanded);
  };

  const buttonStyle = {
    backgroundColor: config.bg_buttonNotExpanded,
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
    color: "white",
    fontSize: "24px",
    lineHeight: "50px",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    transition: "width 0.9s ease, height 0.9s ease, background-color 0.9s",
  };

  const buttonExpandedStyle = {
    backgroundColor: config.bg_buttonExpanded,
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
    color: "white",
    fontSize: "24px",
    lineHeight: "50px",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
    transition: "width 0.9s ease, height 0.9s ease, background-color 0.9s",
  };

  const iconStyle = {
    width: "45px",
    height: "45px",
    transition: "width 0.5s ease, height 0.5s ease", // Agregar animación a los iconos
  };

  let iconContent;

  if (currentIcon.type === "image") {
    iconContent = <img src={currentIcon.url} alt="Icon" style={iconStyle} />;
  } else {
    iconContent = currentIcon.content;
  }

  return (
    <div className="widget-button">
      <button
        onClick={toggleWidget}
        className={`widget-button-toggle ${expanded ? "expanded" : ""}`}
        style={expanded ? buttonExpandedStyle : buttonStyle}
      >
        {iconContent}
      </button>

      {expanded ? (
        <ExpandedWidget expanded={expanded} />
      ) : (
        <ExpandedWidget style={{ display: "none" }} />
      )}
    </div>
  );
};

export default WidgetButton;
