import React from "react";
import PropTypes from "prop-types";

export default function ApiButton2({ api }) {
  const handleClick = async () => {
    const res = await api("/api/two");
    alert(res);
  };

  return (
    <button
      data-testid="btn-2"
      onClick={handleClick}
      style={{
        padding: "10px 20px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
      }}
    >
      Call API 2
    </button>
  );
}

ApiButton2.propTypes = {
  api: PropTypes.func.isRequired,
};
