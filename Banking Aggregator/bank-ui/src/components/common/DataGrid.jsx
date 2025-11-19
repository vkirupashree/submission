import React from 'react';

const DataGrid = ({ columns, data }) => (
  <table className="data-grid">
    <thead>
      <tr>
        {columns.map((col) => (
          <th key={col.key}>{col.label}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, idx) => (
        <tr key={idx}>
          {columns.map((col) => (
            <td key={col.key}>{row[col.key]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default DataGrid;
