import React from "react";

class PopupExample extends React.Component {
  render() {
    const { show, message, onClose } = this.props;

    const popupStyle = {
      position: "fixed",
      top: "40%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "#fafafa",
      padding: "1.5rem 2rem",
      border: "1px solid #ccc",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
      textAlign: "center",
      zIndex: 1000,
    };

    const overlayStyle = {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.3)",
      zIndex: 999,
    };

    const buttonStyle = {
      padding: "0.5rem 1rem",
      background: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px",
    };

    const closeButtonStyle = {
      ...buttonStyle,
      background: "#dc3545",
      marginTop: "1rem",
    };

    if (!show) return null;

    return (
      <div>
        <div style={overlayStyle} onClick={onClose}></div>
        <div style={popupStyle}>
          <h2>{message}</h2>
          <button style={closeButtonStyle} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }
}

export default PopupExample;
