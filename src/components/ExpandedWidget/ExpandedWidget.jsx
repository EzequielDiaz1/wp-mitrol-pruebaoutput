import React, { useState } from "react";
import config from "../../config.json";
import "./ExpandedWidget.css";
import CircularProgress from "@mui/material/CircularProgress";

const iconStyle = {
  width: "50px",
  height: "50px",
};

const ExpandedWidget = ({ expanded }) => {
  const buttonsLength = config.buttons.length;
  const buttons = config.buttons;
  const [iframeStates, setIframeStates] = useState(
    Array(buttonsLength).fill(false)
  );
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const closeIframe = (index, event) => {
    event.stopPropagation();
    const updatedIframeStates = [...iframeStates];
    updatedIframeStates[index] = false;
    setIframeStates(updatedIframeStates);
  };

  const handleButtonClick = (index) => {
    const button = buttons[index];
  
    if (!button.flotante) {
      window.open(button.urlRedirect);
    } else {
      if (!iframeStates[index]) {
        const updatedIframeStates = [...iframeStates];
        updatedIframeStates[index] = true;
        setIframeStates(updatedIframeStates);
        setLoading(true);
      }
    }
  };

  const handleButtonHover = (index) => {
    if (!iframeStates[index]) {
      setHoveredIndex(index);
    }
  };

  const handleButtonLeave = () => {
    setHoveredIndex(null);
  };

  const getButtonStyle = (index) => {
    if (buttonsLength === 1 || iframeStates[index]) {
      return "button-single-style";
    }

    if (buttonsLength === 2) {
      return index === 0
        ? "button-double-first-style"
        : "button-double-second-style";
    }

    if (buttonsLength === 3) {
      switch (index) {
        case 0:
          return "button-triple-first-style";
        case 1:
          return "button-triple-second-style";
        default:
          return "button-triple-third-style";
      }
    }

    return "button-default-style";
  };

  if (config.widget_type === "vertical") {
    return (
      <div
        className={`mitrol-expanded-widget-vertical ${
          expanded ? "expanded" : ""
        }`}
      >
        {config.buttons.map((button, index) => (
          <div
            className={`mitrol-button-container-vertical ${
              expanded ? "fadeIn" : ""
            } ${iframeStates[index] ? "iframe-hover" : ""}`}
            onClick={() => handleButtonClick(index)}
            onMouseEnter={() => handleButtonHover(index)}
            onMouseLeave={handleButtonLeave}
            style={{ backgroundColor: config.bg_buttonInsideWidget }}
          >
            <div
              className="mitrol-button-inside-vertical"
              onClick={() => handleButtonClick(index)}
            >
              <img src={button.icon.url} alt="Icon" style={iconStyle} />
            </div>

            {iframeStates[index] && (
             <div
             className="iframe-container"
             style={{
               position: "absolute",
               left: "-23em",
               top: "-25.5em",
               display: "flex",
               flexDirection: "column",
             }}
           >
                {loading ? (
                  <div className="spinner-container">
                    <CircularProgress style={{ color: config.color_spinner }} />
                  </div>
                ) : null}
                <iframe
                  src={button.urlRedirect}
                  className="iframeMitrol"
                  title="Widget iframe"
                  onLoad={() => setLoading(false)} 
                 />
                <button
                  className="button-close-iframe"
                  onClick={(event) => closeIframe(index, event)}
                >
                  X
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  } else if (config.widget_type === "circular") {
    return (
      <div
        className={`mitrol-expanded-widget-circular ${
          expanded ? "expanded" : ""
        } ${
          buttons.length === 1
            ? "single-button-style"
            : buttons.length === 2
            ? "double-button-style"
            : buttons.length === 3
            ? "triple-button-style"
            : "default-button-style"
        }`}
        style={{ backgroundColor: config.bg_widgetExpanded }}
      >
        {config.buttons.map((button, index) => (
          <div
            className={`mitrol-button-container-circular ${
              expanded ? "fadeIn" : ""
            } ${getButtonStyle(index)}`}
            onClick={() => handleButtonClick(index)}
          >
            <div
              className="mitrol-button-inside-circular"
              style={{ backgroundColor: config.bg_buttonInsideWidget }}
            >
              <img src={button.icon.url} alt="Icon" style={iconStyle} />
            </div>
            <span
              className="mitrol-titulo-circular"
              style={{ color: config.color_titleButtons }}
            >
              {button.title.length > 10
                ? button.title.slice(0, 10) + "..."
                : button.title}
            </span>
          </div>
        ))}
      </div>
    );
  } else {
    return <div>Configuración no válida</div>;
  }
};

export default ExpandedWidget;
