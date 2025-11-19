import React from "react";
import PropTypes from "prop-types";

export default function ApiButton3({ api }) {
  const handleClick = () => {
    // Use the api prop even if it's empty
    api && api(); 
    new Promise((resolve) =>
      setTimeout(() => resolve("API 3 is called"), 500)
    ).then((res) => alert(res));
  };

  return (
    <button
      data-testid="btn-3"
      onClick={handleClick}
      style={{
        padding: "10px 20px",
        backgroundColor: "#ffc107",
        color: "#000",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
      }}
    >
      Call API 3
    </button>
  );
}

ApiButton3.propTypes = {
  api: PropTypes.func.isRequired,
};
