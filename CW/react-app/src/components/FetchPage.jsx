import React, { useState } from "react";
import "./FetchPage.css";

export default function FetchPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData({ error: "Failed to fetch data" });
    }
    setLoading(false);
  };

  return (
    <div className="fetch-page">
      <div className="fetch-container">
        <h2>Fetch Demo Data Page 📥</h2>
        <button className="fetch-button" onClick={fetchData}>
          Fetch
        </button>

        {loading && <p className="loading-text">Loading...</p>}

        {data && (
          <div className="fetch-result">
            <h3>Fetched Data from JSONPlaceholder</h3>
            {data.error ? (
              <p>{data.error}</p>
            ) : (
              <ul>
                <li><strong>ID:</strong> {data.id}</li>
                <li><strong>Title:</strong> {data.title}</li>
                <li><strong>Body:</strong> {data.body}</li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
