import React from "react";
import { useSelector } from "react-redux";
import FormComponent from "./FormComponent.jsx";
import Child2 from "./Child2.jsx";

const FormContainer = () => {
  const submittedData = useSelector((state) => state.form.data);
  
  const outerBoxStyle = {
    //border: "3px solid #007bff",
    borderRadius: "15px",
    padding: "20px",
    margin: "20px auto",
    maxWidth: "900px",
    //backgroundColor: "#f5f5f5",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-start",
    gap: "20px",
    boxSizing: "border-box",
  };

  return (
    <div style={outerBoxStyle}>
      <FormComponent />
      <Child2 submittedData={submittedData} />
    </div>
  );
};

export default FormContainer;
