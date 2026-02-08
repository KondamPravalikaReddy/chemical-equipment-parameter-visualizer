import axios from "axios";
import { Bar } from "react-chartjs-2";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

/* Register Chart.js components */
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

/* Card styling */
const cardStyle = {
  padding: "15px",
  minWidth: "160px",
  borderRadius: "8px",
  backgroundColor: "#f5f5f5",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  textAlign: "center",
};

function App() {
  const [summary, setSummary] = useState(null);
  const [history, setHistory] = useState([]);

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    // Upload CSV
    const res = await axios.post(
      "http://127.0.0.1:8000/api/upload/",
      formData
    );

    console.log("Upload response:", res.data);
    setSummary(res.data);

    // Fetch upload history
    const historyRes = await axios.get(
      "http://127.0.0.1:8000/api/history/"
    );
    setHistory(historyRes.data);
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h2>Chemical Equipment Parameter Visualizer (Web)</h2>

      {/* File Upload */}
      <input type="file" onChange={uploadFile} />

      {/* Summary Cards */}
      {summary && (
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "20px",
            marginBottom: "30px",
          }}
        >
          <div style={cardStyle}>
            <h4>Total Equipment</h4>
            <p>{summary.total_equipment}</p>
          </div>

          <div style={cardStyle}>
            <h4>Avg Flowrate</h4>
            <p>{summary.avg_flowrate}</p>
          </div>

          <div style={cardStyle}>
            <h4>Avg Pressure</h4>
            <p>{summary.avg_pressure}</p>
          </div>

          <div style={cardStyle}>
            <h4>Avg Temperature</h4>
            <p>{summary.avg_temperature}</p>
          </div>
        </div>
      )}

      {/* Bar Chart */}
      {summary && (
        <Bar
          data={{
            labels: Object.keys(summary.type_distribution),
            datasets: [
              {
                label: "Equipment Count",
                data: Object.values(summary.type_distribution),
                backgroundColor: [
                  "#4CAF50",
                  "#2196F3",
                  "#FF9800",
                  "#9C27B0",
                ],
                borderColor: "#333",
                borderWidth: 1,
              },
            ],
          }}
        />
      )}

      {/* Upload History */}
      {history.length > 0 && (
        <>
          <h3 style={{ marginTop: "30px" }}>Last 5 Uploads</h3>
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Total Equipment</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.summary.total_equipment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default App;
