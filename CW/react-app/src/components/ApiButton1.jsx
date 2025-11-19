import React from "react";
import PropTypes from "prop-types";

export default function ApiButton1({ api }) {
  const handleClick = () => {
    api("/api/one").then((res) => alert(res));
  };

  return (
    <button
      data-testid="btn-1"
      onClick={handleClick}
      style={{
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
      }}
    >
      Call API 1
    </button>
  );
}

ApiButton1.propTypes = {
  api: PropTypes.func.isRequired,
};
