import React from "react";
import { connect } from "react-redux";

class ReadOnlyView extends React.Component {
  render() {
    const { submittedData } = this.props;

    const containerStyle = {
      border: "2px solid #28a745",
      padding: "15px",
      borderRadius: "8px",
      marginTop: "10px",
    };

    return (
      <div style={containerStyle}>
        <h4>Read-only View</h4>
        {submittedData ? (
          <div>
            <p>
              <strong>Field 1:</strong> {submittedData.field1}
            </p>
            <p>
              <strong>Field 2:</strong> {submittedData.field2}
            </p>
            <p>
              <strong>Field 3:</strong> {submittedData.field3}
            </p>
          </div>
        ) : (
          <p>Waiting for submission...</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  submittedData: state.submittedData,
});

export default connect(mapStateToProps)(ReadOnlyView);
