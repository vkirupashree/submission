import React, { useState } from "react";
import "./FormComponent.css";

const FormComponent = () => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`You said: ${input}`);
    setInput(""); // clear input
  };

  return (
    <div className="content-boxf">
      <h1>Say Something</h1>
      <p>Type a message and submit it below:</p>
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Say something..."
          className="form-input"
          required
        />
        <button type="submit" className="form-button">Submit</button>
      </form>
    </div>
  );
};

export default FormComponent;
